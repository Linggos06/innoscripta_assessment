### Documentation

Here's a simple documentation to run the project within a Docker container:

1.  Prerequisites: Ensure that Docker is installed on your system.
2.  Clone the Repository: Clone the frontend application repository to your local machine.
3.  Navigate to Project Directory: Open a terminal and navigate to the root directory of the frontend application.
4.  Build Docker Image: Run the command `docker build -t frontend-app:dev .` to build the Docker image.
5.  Run Docker Container: Execute `docker run -p 5173:5173 frontend-app:dev` to start a container based on the built image.
6.  Access the Application: Open a web browser and navigate to `http://localhost:5173` to access the running frontend application.
