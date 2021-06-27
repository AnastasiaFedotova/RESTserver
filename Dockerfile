FROM node:14
WORKDIR /usr/local/app/
RUN npm install
CMD npm run start
