# hello-k8s

### 1. Initialize the project and run it locally

![Screenshot 2024-11-15 at 13 45 28](https://github.com/user-attachments/assets/a53adbe3-3093-4cb1-bdc3-a46aa9cb06c6)

- Set up the project by following the initialization steps.
- Run the app locally to test the basic functionality.

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
