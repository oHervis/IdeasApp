FROM node:10.15.0-jessie-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# RUN npm run typeorm migration:run

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
