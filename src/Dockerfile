###############################################################################
###############################################################################
##                                                                           ##
## description     : Dockerfile for healthmap-web-api-v4 Application         ##
## author          : Pierre Benazzi :: pierrebenazzibr@gmail.com             ##
## date            : 20200803                                                ##
## version         : 1.0                                                     ##
###############################################################################
###############################################################################
FROM node:12.13.0-alpine

ENV PORT 8081
ENV NODE_ENV production

WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
# RUN yarn install --production
RUN yarn install

# RUN apk update && apk add build-base git python
# RUN apk update && apk add --no-cache bash

# Copy all other source code to work directory
ADD . /usr/src/app
# TypeScript
RUN yarn build

# Start
CMD ["yarn", "start:prod"]

EXPOSE 8081






# COPY package.json .
# COPY yarn.lock .
# # COPY ./src ./src
# COPY ./dist ./dist
# COPY ./resources ./resources
# COPY ./spec ./spec



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

