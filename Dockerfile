FROM node:18-alpine

WORKDIR /app

# Copy everything (exclude junk via .dockerignore)
COPY . .

# Install all dependencies (backend + client)
RUN npm run prebuild

# Build frontend and move to backend/public
RUN npm run build

# Expose port
EXPOSE 8080

# Start the backend
CMD ["npm", "start"]