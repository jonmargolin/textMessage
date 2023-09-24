# Stage 1: Build the React application
FROM node:14 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Create the Apache server container
FROM httpd:2.4

# Copy the built React app from the build stage into the Apache container
COPY --from=build /app/dist /usr/local/apache2/htdocs/

# Expose port 80 (default HTTP port)
EXPOSE 80

# You can optionally add any custom Apache configuration here
# For example, you can copy a custom Apache config file:
# COPY ./my-apache.conf /usr/local/apache2/conf/httpd.conf

# Start the Apache server
CMD ["httpd-foreground"]
