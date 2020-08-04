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

WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
# RUN yarn install --production
RUN yarn install

# Copy all other source code to work directory
ADD . /usr/src/app

###############################################################################
#                                                                             #
#                               PRODUCTION ONLY                               #
#                                                                             #
###############################################################################
# RUN yarn build
# COPY package.json ./dist
# ENV PORT 8081
# ENV NODE_ENV production


###############################################################################
#                                                                             #
#                               DEVELOPMENT ONLY                              #
#                                                                             #
###############################################################################
CMD ["yarn", "dev"]
ENV NODE_ENV development

EXPOSE 5000