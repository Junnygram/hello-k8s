
---

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
![Screenshot 2024-11-15 at 13 45 28](https://github.com/user-attachments/assets/b75a3aad-7e99-4664-8a0a-d3275517ad36)

---

### 2. Dockerize the Application

1. **Build the Docker image**:

   ```bash
   docker build -t hello-k8s .
   ```
   **Screenshot**:  
   ![Building the Docker image](https://github.com/user-attachments/assets/81e5c919-d226-4505-addc-e8567616df96)

---

2. **Run three instances** of the application using Docker Compose:

   ```yaml
   version: '3'

   services:
     app1:
       build:
         context: .
       environment:
         - APP_NAME=hello-k8s-app1
       ports:
         - '3001:3000'

     app2:
       build:
         context: .
       environment:
         - APP_NAME=hello-k8s-app2
       ports:
         - '3002:3000'

     app3:
       build:
         context: .
       environment:
         - APP_NAME=hello-k8s-app3
       ports:
         - '3003:3000'
   ```

---

3. **Test each instance** with an updated nginx image  :

   - Access:
     - `http://localhost:3001/app1`
     - `http://localhost:3002/app2`
     - `http://localhost:3003/app3`

   - Verify functionality.

   **Screenshots**:
    ![Screenshot 2024-11-19 at 17 15 49](https://github.com/user-attachments/assets/e11fbe11-fd41-431b-a8d4-7e8bbc0cfc53)
  ![Screenshot 2024-11-19 at 17 16 00](https://github.com/user-attachments/assets/b95eb7cd-cf38-4498-9e67-b544adf5da9f)
  ![Screenshot 2024-11-19 at 17 16 11](https://github.com/user-attachments/assets/c182e1a4-2ecd-4082-8aec-875e1908d158)
   
  
 
---

### 3. implemented Reveresed proxy for NGINX to Serve the Application

1. Create an NGINX configuration to serve the three instances:  

   **Example `nginx.conf`:**
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
![Screenshot 2024-11-19 at 17 20 56](https://github.com/user-attachments/assets/a15dad27-aea9-44f6-9c81-2d0bd63af94c)
![Screenshot 2024-11-19 at 17 21 15](https://github.com/user-attachments/assets/dfd287a7-b4e5-42ca-98fc-9789f48df719)

---


### 4. Fully Configure Reverse Proxy with Docker Compose

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

   **Screenshot**:

   ![Screenshot 2024-11-19 at 21 40 41](https://github.com/user-attachments/assets/5aa2b4c7-682b-4dda-ae55-1e24974eef18)

   ![NGINX serving multiple instances](https://github.com/user-attachments/assets/213a7dde-a81e-45fd-af64-4ce51d5d33aa)

   ![Load-balanced response](https://github.com/user-attachments/assets/1858f277-ac24-42c5-9221-85d55418fb6f)

---

### Next Steps

- **Deploy to Kubernetes**: Scale the setup further by deploying to a Kubernetes cluster.

--- 

This updated README now clearly showcases the process and includes the necessary images for better understanding. Let me know if you need additional changes!
