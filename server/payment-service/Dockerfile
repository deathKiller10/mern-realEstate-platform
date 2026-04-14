# Use the official Node.js lightweight image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application code
COPY . .

# Expose the port (Cloud Run overrides this with its own PORT env var, but good practice)
EXPOSE 5000

# The command to start your server
CMD ["node", "server.js"]