# Imagen base de Ubuntu
FROM ubuntu

# Desactivar la interacción del terminal para evitar errores
ENV DEBIAN_FRONTEND=noninteractive

# Instalar Apache
RUN apt-get update && \
    apt-get install -y apache2 && \
    apt-get clean

# Copiar archivos del proyecto al directorio raíz del servidor Apache
COPY . /var/www/html/

# Dar permisos a los archivos copiados (opcional, útil para algunas imágenes)
RUN chown -R www-data:www-data /var/www/html

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar Apache en primer plano
CMD ["apachectl", "-D", "FOREGROUND"]
