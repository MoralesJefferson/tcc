FROM node:20.14

WORKDIR /tmp/react

COPY . .

RUN npm install

RUN npm run build

RUN mkdir -p /var/www/html

COPY . .

RUN mv build/* /var/www/html

VOLUME /var/www/html

WORKDIR /

RUN rm -rf /tmp/react