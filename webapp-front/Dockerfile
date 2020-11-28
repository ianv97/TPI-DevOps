FROM node as base
WORKDIR /app
RUN npm install -g serve

FROM node as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run-script build

FROM base as final
COPY --from=build /app/build /build
CMD serve -s build