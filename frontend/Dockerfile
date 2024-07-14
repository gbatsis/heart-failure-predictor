# Dockerfile for React App
FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

CMD ["npm", "start"]
