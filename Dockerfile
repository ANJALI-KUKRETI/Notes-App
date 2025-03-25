# Use Node.js as the base image to build the app
FROM node:18-alpine AS builder

# Set the working directory to the project root (where package.json is)
WORKDIR /app

# Copy package files first to take advantage of Docker's layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the built React app
FROM nginx:alpine

# Copy the built files to Nginx's default HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
