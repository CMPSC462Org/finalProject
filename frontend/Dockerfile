# Use Node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy frontend files
COPY . .

# Install dependencies
RUN npm install

# Build the frontend
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose frontend port
EXPOSE 5173

# Serve the built app
CMD ["serve", "-s", "dist", "-l", "5173"]