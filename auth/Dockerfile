FROM node:alpine 

# setup of workign directory 
WORKDIR /app
# copy over only package.json
COPY package.json .
# install all dependencies
RUN npm install
# copy over everything else from into /app folder
COPY . . 

# command to run when the image (or container) first starts up
CMD ["npm", "start"]