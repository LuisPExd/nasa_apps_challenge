import requests
import pandas as pd
from datetime import datetime

def get_merra_data_power(latitude, longitude, start_date, end_date):
    """
    Obtiene datos MERRA-2 a través de NASA POWER API
    """
    base_url = "https://power.larc.nasa.gov/api/temporal/daily/point"
    
    parameters = [
        'T2M',        # Temperatura a 2 metros
        'T2M_MAX',    # Temperatura máxima
        'T2M_MIN',    # Temperatura mínima
        'RH2M',       # Humedad relativa
        'PRECTOTCORR', # Precipitación
        'WS2M',       # Velocidad del viento
        'PS',         # Presión superficial
        'ALLSKY_SFC_SW_DWN'  # Radiación solar
    ]
    
    params = {
        'parameters': ','.join(parameters),
        'community': 'RE',
        'longitude': longitude,
        'latitude': latitude,
        'start': start_date,
        'end': end_date,
        'format': 'JSON'
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()
        
        print("🌤️ Datos MERRA-2 obtenidos exitosamente")
        print(f"📍 Ubicación: {latitude}, {longitude}")
        print(f"📅 Período: {start_date} a {end_date}")
        print("\n📊 Variables disponibles:")
        
        # Mostrar variables disponibles
        for param in parameters:
            if param in data['properties']['parameter']:
                values = list(data['properties']['parameter'][param].values())
                print(f" - {param}: {len(values)} registros")
        
        return data
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Error al obtener datos: {e}")
        return None

# Ejemplo de uso
if __name__ == "__main__":
    # Coordenadas de Lima, Perú
    lat, lon = -12.0464, -77.0428
    
    # Fechas (formato YYYYMMDD)
    start_date = "20240101"
    end_date = "20241231"
    
    data = get_merra_data_power(lat, lon, start_date, end_date)
    
    if data:
        # Convertir a DataFrame para mejor visualización
        df_data = {}
        for param, values in data['properties']['parameter'].items():
            dates = []
            param_values = []
            for date_str, value in values.items():
                dates.append(datetime.strptime(date_str, '%Y%m%d'))
                param_values.append(value)
            
            df_data[param] = param_values
        
        df = pd.DataFrame(df_data, index=dates)
        print(f"\n📈 Primeras 5 filas de datos:")
        print(df.head())