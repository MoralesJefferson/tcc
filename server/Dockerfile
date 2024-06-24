FROM node:18

WORKDIR ./server

#COPY package*.json ./

COPY . .

RUN rm -rf node_modules

RUN npm install

EXPOSE 5008

CMD ["npm", "start"]
