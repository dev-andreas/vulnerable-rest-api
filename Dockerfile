# Build the Node.js application
FROM node:18 as builder

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci

COPY . .

# Run the Node.js application
FROM node:18-slim as runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./

EXPOSE 8080

CMD ["node", "./src/index.js"]
