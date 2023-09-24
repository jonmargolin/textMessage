# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install
RUN npm install -g @nestjs/cli
# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your Nest.js application will run on (default is 3000)
EXPOSE 3000

# Define the command to run your Nest.js application using npm or yarn
CMD ["npm", "start"]
