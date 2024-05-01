FROM node:14.17.0-alpine3.13

# Create app directory
WORKDIR /usr

# Copy package.json, tsconfig.json and source code
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN ls -la
RUN npm install
RUN npm run build

RUN npm install -g pm2
EXPOSE 3000
CMD ["pm2-runtime", "dist/index.js"]