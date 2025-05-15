#!/bin/bash

echo "Setting up FoodyDost for the first time..."

# Step 1: Stop & clean existing containers and volumes
echo "Cleaning up previous Docker containers and volumes..."
docker compose down --volumes

# Step 2: Rename .env.example to .env inside backend/
ENV_FILE="./backend/.env"
if [ ! -f "$ENV_FILE" ]; then
  echo "Creating environment file from example..."
  cp ./backend/.env.example "$ENV_FILE"
else
  echo "Environment file already exists at backend/.env"
fi

# Step 3: Build all containers
echo "Building backend and mongo services..."
docker compose build

# Step 4: Start MongoDB and Backend
echo "Starting services in the background..."
docker compose up -d

# Step 5: Wait for backend and database to initialize
echo "Waiting for services to initialize..."
sleep 10

# Step 6: Seed database
echo "Seeding MongoDB..."
docker compose exec backend npm run seed

# Done
echo ""
echo "Setup complete."
echo ""
echo "Backend:  http://localhost:8080"
echo "MongoDB:  mongodb://localhost:27017"
echo "Frontend: Run the following manually:"
echo ""
echo "     cd client"
echo "     npm install"
echo "     npm run dev"
echo ""
echo "Your changes to the frontend will auto-refresh in development mode."
