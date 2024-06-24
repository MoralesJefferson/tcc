# Use a imagem oficial do MySQL do Docker Hub
FROM mysql:8.4

# Defina a senha do root (obrigatório)
ENV MYSQL_ROOT_PASSWORD=123456

# Defina um banco de dados inicial (opcional)
ENV MYSQL_DATABASE=tcc

# Defina um usuário adicional (opcional)
ENV MYSQL_USER=receita-ja
ENV MYSQL_PASSWORD=123456

# Exponha a porta 3306 para permitir conexões externas ao banco de dados
EXPOSE 3306

#copia o backup para imagem
COPY backup.sql /docker-entrypoint-initdb.d/
