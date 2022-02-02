FROM --platform=$BUILDPLATFORM node:16-alpine as Node

# install dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --network-timeout 1000000 install

# Copy all local files into the image.
COPY . .

RUN yarn build

FROM nginx:alpine

COPY --from=Node /app/build /usr/share/nginx/html
COPY ./docker/nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY ./docker/frontend-entrypoint.sh /

RUN ["chmod", "+x", "/frontend-entrypoint.sh"]
ENTRYPOINT ["/frontend-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]