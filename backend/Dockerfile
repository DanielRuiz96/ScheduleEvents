# Usar una imagen base de Python
FROM python:3.11.1-slim

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar el archivo de requerimientos e instalar dependencias
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copiar el código de la aplicación en el contenedor
COPY . .

# Exponer el puerto en el que Flask se ejecutará (por defecto 5000)
EXPOSE 5000

# Comando para iniciar la aplicación Flask
CMD ["python", "app.py"]
