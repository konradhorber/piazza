FROM alpine
RUN apk add --update nodejs npm
RUN npm install -g nodemon
COPY . /src
WORKDIR /src
EXPOSE 3000
ENTRYPOINT ["nodemon", "./app.js"]