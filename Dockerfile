# build environment
FROM node:14.5.0-alpine3.10 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app
RUN npm run build
# RUN ls /app

EXPOSE 443
CMD [ "npm", "run", "prod" ] 

# production environment
# FROM nginx:stable-alpine
# COPY --from=build /app /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
