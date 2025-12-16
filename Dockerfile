FROM node:21-alpine AS BUILD

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build --configuration=development

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=BUILD /app/dist/digitalbanking_front/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
