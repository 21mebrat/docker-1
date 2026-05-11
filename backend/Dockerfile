# =========================
# Production Backend Image
# =========================

FROM node:20-alpine
# Create app directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start application
CMD ["node", "server.js"]