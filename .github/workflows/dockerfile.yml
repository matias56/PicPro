version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
  app:
    build: ./app
    ports:
      - "3000:3000"
    depends_on:
      - web