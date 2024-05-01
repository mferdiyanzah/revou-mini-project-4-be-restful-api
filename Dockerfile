FROM node:14.17.0-alpine3.13

# Create app directory
WORKDIR /usr

# Copy files
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY .env ./

# Install app dependencies
RUN ls -la
RUN npm install
RUN npm run build

# Bundle app source
RUN npm install -g pm2
EXPOSE 3000
CMD ["pm2-runtime", "dist/index.js"]