FROM node:23-slim

# Setting the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy all other necessary files
COPY ./src ./src
COPY .env ./

# Expose port
EXPOSE 8080

# Starting command
CMD ["node", "./src/index.js"]
