# Specify a base image
FROM node:16.13.1-alpine3.13
RUN apk add --update \
    curl \
    && rm -rf /var/cache/apk/*
    
WORKDIR /usr/app

# Install some depenendencies
COPY ./package.json ./
RUN npm install
COPY ./ ./


# Default command
CMD ["npm", "run", "dev"]
