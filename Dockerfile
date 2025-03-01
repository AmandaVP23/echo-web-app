# Use Node.js 20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies with Yarn
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the entire project
COPY . .

# Build the Next.js app
RUN yarn build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
