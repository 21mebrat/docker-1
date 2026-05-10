# =========================
# Build Stage
# =========================

FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# =========================
# Production Stage
# =========================

FROM nginx:alpine

# Copy built frontend files
COPY --from=build /app/dist /usr/share/nginx/html

# React Router support
RUN printf 'server {\n\
  listen 80;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
\n\
  location / {\n\
    try_files $uri /index.html;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]