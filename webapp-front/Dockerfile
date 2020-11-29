FROM node as build
WORKDIR /app
COPY . .
ARG STAGE
RUN npm install
RUN npm run-script build:${STAGE}

FROM nginx as final
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf