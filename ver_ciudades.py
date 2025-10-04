from openaq import OpenAQ

# Instancia del cliente (asegúrate de tener tu API key en una variable de entorno o pasarla aquí)
client = OpenAQ(api_key="d2a3e44a3f3c5edf8c0a6c01b174dd7c4cdbc3c470d9da78339a5e47383b0f4c")

# Obtener todas las estaciones de medición en Perú
locations = client.locations.list(iso="PE", limit=100)

# Mostrar los nombres y coordenadas de las estaciones
for loc in locations.results:
    print(f" {loc.name} - {loc.coordinates.latitude}, {loc.coordinates.longitude},{loc.id}")

