FROM node:20-alpine as deps

WORKDIR /app
COPY app/package*.json .
RUN npm install

FROM node:20-alpine as builder
# Specify ARG NEXT_PUBLIC_* here if any, so that they are available during build time
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY app .
RUN npm run build

FROM node:20-alpine as runner
WORKDIR /app
COPY app/next.config.js .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]
