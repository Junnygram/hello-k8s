# hello-k8s

### 1. Initialize the project and run it locally

![Screenshot 2024-11-15 at 13 45 28](https://github.com/user-attachments/assets/a53adbe3-3093-4cb1-bdc3-a46aa9cb06c6)

- Set up the project by following the initialization steps.
- Run the app locally to test the basic functionality.
![Screenshot 2024-11-19 at 17 21 15](https://github.com/user-attachments/assets/e6172d24-d7a1-4b4f-b766-31524128fdd6)
![Screenshot 2024-11-19 at 17 20 56](https://github.com/user-attachments/assets/7e28bfe7-0464-45c7-826b-82917d025543)
![Screenshot 2024-11-19 at 17 20 37](https://github.com/user-attachments/assets/dba43f9f-3de9-4721-8dc5-6a24b6f1ceed)
![Screenshot 2024-11-19 at 21 40 44](https://github.com/user-attachments/assets/213a7dde-a81e-45fd-af64-4ce51d5d33aa)
![Screenshot 2024-11-19 at 21 40 41](https://github.com/user-attachments/assets/187e1296-5cb0-4b7c-8a7f-b1f3b1f7d4f5)
![Screenshot 2024-11-19 at 21 40 34](https://github.com/user-attachments/assets/1a7fc011-d51b-4da7-81ca-bb1519c7564e)

---

### 2. Dockerize the application

- Created a `Dockerfile`, `.dockerignore`, and `docker-compose.yml` configuration.

To Dockerize the application, follow these steps:

1. **Build and start the app** in detached mode using Docker Compose:

```bash
docker-compose up --build -d
```

2. **Tag the Docker image** with the appropriate repository name:

```bash
docker tag hello-k8s junny27/hello-k8s:latest
```

3. **Log in to Docker Hub**:

```bash
docker login
```

4. **Push the Docker image** to Docker Hub:

```bash
docker push junny27/hello-k8s:latest
```

Once the push is successful, your image will be available in the `junny27/hello-k8s` repository on Docker Hub.
