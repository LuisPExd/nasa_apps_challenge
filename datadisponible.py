from openaq import OpenAQ
from datetime import datetime, timedelta
import pytz

client = OpenAQ(api_key="d2a3e44a3f3c5edf8c0a6c01b174dd7c4cdbc3c470d9da78339a5e47383b0f4c")
pais = "PE"

# Calcular fecha límite (últimos 100 días)
fecha_limite = datetime.now(pytz.utc) - timedelta(days=100)

print(f"Estaciones disponibles en {pais} (con datos en los últimos 100 días):")

estaciones = client.locations.list(iso=pais, limit=1000)
estaciones_actualizadas = []

for e in estaciones.results:
    try:
        # Obtener información de sensores para ver la última medición
        sensores_estacion = client.locations.sensors(locations_id=e.id)
        
        if sensores_estacion.results:
            # Buscar la última medición entre todos los sensores
            ultima_medicion = None
            
            for sensor in sensores_estacion.results:
                if hasattr(sensor, 'datetime_last') and sensor.datetime_last:
                    fecha_sensor_str = sensor.datetime_last.get('utc', '')
                    if fecha_sensor_str:
                        fecha_sensor = datetime.fromisoformat(fecha_sensor_str.replace('Z', '+00:00'))
                        if ultima_medicion is None or fecha_sensor > ultima_medicion:
                            ultima_medicion = fecha_sensor
            
            # Verificar si la última medición está dentro de los últimos 5 días
            if ultima_medicion and ultima_medicion >= fecha_limite:
                estaciones_actualizadas.append({
                    'id': e.id,
                    'nombre': e.name,
                    'coordenadas': f"{e.coordinates.latitude}, {e.coordinates.longitude}",
                    'ultima_medicion': ultima_medicion,
                    'dias_desde_ultima': (datetime.now(pytz.utc) - ultima_medicion).days
                })
                
    except Exception as ex:
        print(f"Error al procesar estación {e.id}: {ex}")
        continue

# Mostrar estaciones filtradas
if estaciones_actualizadas:
    print(f"\n Se encontraron {len(estaciones_actualizadas)} estaciones con datos recientes:")
    
    for estacion in estaciones_actualizadas:
        print(f" - ID: {estacion['id']} | Nombre: {estacion['nombre']}")
        print(f"   Coordenadas: {estacion['coordenadas']}")
        print(f"   Última medición: {estacion['ultima_medicion'].strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"   Hace {estacion['dias_desde_ultima']} días")
        print()
else:
    print(" No se encontraron estaciones con datos en los últimos 5 días")
    # Mostrar todas las estaciones para referencia
    print("\n Todas las estaciones disponibles:")
    for e in estaciones.results:
        print(f" - ID: {e.id} | Nombre: {e.name}")

# Si hay estaciones actualizadas, permitir seleccionar una
if estaciones_actualizadas:
    station_id = int(input("\n Ingresa el ID de la estación que quieres explorar: "))
    
    # SENSORES DISPONIBLES
    print(f"\n Sensores disponibles en la estación {station_id}:\n")
    sensores = client.locations.sensors(locations_id=station_id)

    for s in sensores.results:
        try:
            # Acceder a los datos según la estructura real
            sensor_id = s.id
            sensor_name = s.name
            parameter = s.parameter  # Esto es un diccionario
            
            # Extraer información del parámetro
            param_name = parameter.get('name', 'N/A')
            display_name = parameter.get('displayName', param_name)
            units = parameter.get('units', 'N/A')
            
            # Formatear fechas
            primera_medicion = datetime.fromisoformat(s.datetime_first['utc'].replace('Z', '+00:00')).strftime('%Y-%m-%d %H:%M')
            ultima_medicion = datetime.fromisoformat(s.datetime_last['utc'].replace('Z', '+00:00')).strftime('%Y-%m-%d %H:%M')
            
            print(f" - ID Sensor: {sensor_id} | Nombre: {sensor_name}")
            print(f"   Parámetro: {display_name} ({param_name}) | Unidad: {units}")
            print(f"   Primera medición: {primera_medicion}")
            print(f"   Última medición: {ultima_medicion}")
            print(f"   Último valor: {s.latest['value']} {units}")
            print()  
            
        except Exception as e:
            print(f" - Error con sensor {s.id if hasattr(s, 'id') else 'N/A'}: {e}")
            print()