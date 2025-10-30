FROM node:18-alpine AS builder
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm ci --silent

# copy sources and build
COPY . .
RUN npm run build --if-present

FROM nginx:stable-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: copy custom nginx config if you have one
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
