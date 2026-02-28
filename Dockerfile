FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build frontend and backend
RUN npm run build
RUN npm run build:server

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]
