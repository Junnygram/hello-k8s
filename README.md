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
![Screenshot 2024-11-15 at 17 47 34](https://github.com/user-attachments/assets/a0416178-b994-438c-91d5-2320a737ccf3)

2. **Tag the Docker image** with the appropriate repository name, **Log in to Docker Hub**,  **Push the Docker image** to Docker Hub:

```bash
docker tag hello-k8s junny27/hello-k8s:latest
```
```bash
docker login
```
```bash
docker push junny27/hello-k8s:latest
```



