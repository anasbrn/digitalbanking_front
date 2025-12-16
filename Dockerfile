FROM node:21-alpine AS BUILD

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build --configuration=development

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/digital_bank.conf
COPY --from=BUILD /app/dist/digitalbanking_front/browser /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
