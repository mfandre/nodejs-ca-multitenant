FROM node:10.16.0-stretch

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

COPY . .
# If you are building your code for production
#RUN npm ci --only=production


#will need to remove it if you dont use SQL db...
#RUN npm run knex migrate:latest
#RUN npm run knex seed:run

EXPOSE 80

CMD [ "npm", "start"]