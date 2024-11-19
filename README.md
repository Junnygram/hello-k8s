# hello-k8s

## Overview

The `hello-k8s` project demonstrates creating, containerizing, and reverse proxying a microservices application. The setup ensures secure and efficient load balancing using NGINX. This guide details the steps from local testing to fully configuring the reverse proxy.

---

## Steps to Set Up and Test

### 1. Build and Test Locally

1. **Run the application locally** to verify it works:

   ```bash
   node index.mjs
   ```

   - Access the application locally to confirm functionality.

   **Screenshot**:  
   ![Screenshot showing the application running locally](https://github.com/user-attachments/assets/a53adbe3-3093-4cb1-bdc3-a46aa9cb06c6)

---

### 2. Dockerize the Application

1. **Build the Docker image**:

   ```bash
   docker build -t hello-k8s .
   ```
   ![Screenshot 2024-11-15 at 17 47 34](https://github.com/user-attachments/assets/81e5c919-d226-4505-addc-e8567616df96)


2. **Run three instances** of the application using Docker compose :

   ```bash
   # version: '3'

# services:
#   app1:
#     build:
#       context: .
#     # image: hello-k8s
#     environment:
#       - APP_NAME=hello-k8s-app1
#     ports:
#       - '3001:3000'

#   app2:
#     build:
#       context: .
#     # image: hello-k8s
#     environment:
#       - APP_NAME=hello-k8s-app2
#     ports:
#       - '3002:3000'

#   app3:
#     build:
#       context: .
#     # image: hello-k8s
#     environment:
#       - APP_NAME=hello-k8s-app3
#     ports:
#       - '3003:3000'
   ```






![Screenshot 2024-11-19 at 17 20 56](https://github.com/user-attachments/assets/cf6d507c-c955-4d42-9d8b-2fa0947d5da8)

![Screenshot 2024-11-19 at 17 21 15](https://github.com/user-attachments/assets/58c16ad9-0723-4753-9e9b-abaa0590458c)


3. **Test each instance**:

   - Access:

     - `http://localhost:3001/app1`
     - `http://localhost:3002/app2`
     - `http://localhost:3003/app3`

   - Verify functionality.

   **Screenshots**:

   - ![App running on instance 1](https://github.com/user-attachments/assets/e6172d24-d7a1-4b4f-b766-31524128fdd6)
   - ![App running on instance 2](https://github.com/user-attachments/assets/7e28bfe7-0464-45c7-826b-82917d025543)
   - ![App running on instance 3](https://github.com/user-attachments/assets/dba43f9f-3de9-4721-8dc5-6a24b6f1ceed)

---

### 3. Use NGINX to Serve the Application

1. Create an NGINX configuration to serve the three instances.  
   Example `nginx.conf`:

   ```nginx
   worker_processes auto;
   events {
       worker_connections 1024;
   }

   http {
       include mime.types;

       upstream nodejs_cluster {
           server app1:3000;
           server app2:3000;
           server app3:3000;
       }

       server {
           listen 80;

           location / {
               proxy_pass http://nodejs_cluster;
               proxy_set_header Host $host;
               proxy_set_header X-Real-IP $remote_addr;
           }
       }
   }
   ```

2. Test NGINX by integrating it with Docker Compose.

**Screenshot**:  
![NGINX serving multiple instances](https://github.com/user-attachments/assets/213a7dde-a81e-45fd-af64-4ce51d5d33aa)

---

### . Fully Configure Reverse Proxy with Docker Compose

1. Update `docker-compose.yml` to include NGINX and the three application instances:

   ```yaml
   version: '3.8'

   services:
     app1:
       build:
         context: .
         dockerfile: Dockerfile
       environment:
         - APP_NAME=hello-k8s-app1
       ports:
         - '3001:3000'

     app2:
       build:
         context: .
         dockerfile: Dockerfile
       environment:
         - APP_NAME=hello-k8s-app2
       ports:
         - '3002:3000'

     app3:
       build:
         context: .
         dockerfile: Dockerfile
       environment:
         - APP_NAME=hello-k8s-app3
       ports:
         - '3003:3000'

     nginx:
       image: nginx:latest
       container_name: reverse-proxy
       depends_on:
         - app1
         - app2
         - app3
       ports:
         - '80:80'
       volumes:
         - ./nginx.conf:/etc/nginx/nginx.conf:ro
   ```

2. Run the updated `docker-compose.yml`:

   ```bash
   docker-compose up --build -d
   ```

3. Access the application via `http://localhost/` to confirm it's working through the reverse proxy.

   - Refresh the page multiple times to verify load balancing. Each refresh serves a response from a different instance.
![Screenshot 2024-11-19 at 21 40 41](https://github.com/user-attachments/assets/1858f277-ac24-42c5-9221-85d55418fb6f)


   **Screenshots**:

 

<!-- need ssl certificate for make it secured  -->
