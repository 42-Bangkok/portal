FROM node:20-alpine

# Specify ARG NEXT_PUBLIC_* here if any, so that they are available during build

ENV NODE_ENV production

WORKDIR /app
COPY app /app
RUN npm install
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
