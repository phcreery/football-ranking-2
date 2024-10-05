FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build the React app
RUN npm run build-notsc

# Expose the port that the server will listen on
EXPOSE 80

# Start the application
CMD [ "npx", "serve", "-s", "dist/", "-l", "8002" ]