# Stage 1: Build the Angular application
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code and build for production
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the compiled files from Stage 1 to Nginx's serving directory
# Note: Angular 17+ usually outputs to dist/[project-name]/browser.
# Adjust "ai-portfolio-frontend" if your folder name in dist/ is different.
COPY --from=build /app/dist/ai-portfolio-frontend/browser /usr/share/nginx/html

# Expose port 80 inside the container
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
