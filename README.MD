## THIS README CONTAINS SYSTEM DESIGN AND SET UP INSTRUCTIONS 

# SETUP INSTRUCTIONS 
- YOU CAN USE docker compose to start the frontend and backend application
- Set the right values in the envs of each service in the docker-compose.yml especially the Open_Exchange env 
- run docker compose up 

---
- Without docker compose  create an env file in the root folder of each project
- for backend these are the envs you need
- DATABASE_URL 
- JWT_SECRET
- JWT_SECRET_NONCE
- OPEN_EXCHANGE

- for frontend 
- VITE_BASE_URL


- npm run start:con to start backend app
- npm run dev to start frontend

 