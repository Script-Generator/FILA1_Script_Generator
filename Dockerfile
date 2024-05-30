FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm clean-install
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
