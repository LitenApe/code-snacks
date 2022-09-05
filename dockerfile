FROM node:18-alpine
WORKDIR /usr/server/app

# Prepare service
COPY ./package.json ./
RUN npm install
COPY ./ .

# Build service
RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "run" ,"start"]