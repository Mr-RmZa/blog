FROM node:18.14.0-alpine3.17
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
RUN mkdir data
COPY package.json .
RUN npm install
COPY . .
ENV API_URL=http://example.com/API_URL
EXPOSE 3000
CMD [ "npm", "start" ]