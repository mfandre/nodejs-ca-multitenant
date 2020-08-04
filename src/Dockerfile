###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 20190820                                                ##
## version         : 1.0                                                     ##
###############################################################################
###############################################################################
FROM node:12.13.0-alpine

RUN apk update && apk add build-base git python

COPY package.json .
COPY yarn.lock .
COPY ./src ./src
COPY ./dist ./dist
COPY ./resources ./resources
COPY ./spec ./spec

RUN yarn install --production

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

CMD ["yarn", "start:prod"]





# FROM node:10.16.0-stretch

# Create app directory
# WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

# RUN npm install

# COPY . .
# If you are building your code for production
#RUN npm ci --only=production


#will need to remove it if you dont use SQL db...
#RUN npm run knex migrate:latest
#RUN npm run knex seed:run

# EXPOSE 80

# CMD [ "npm", "start"]

