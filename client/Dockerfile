FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
# test build with docker build -t XXX/client .
# push: docker push XXX/client:latest