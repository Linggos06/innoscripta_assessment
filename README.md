### Documentation

Here's a simple documentation to run the project within a Docker container:

1.  Prerequisites: Ensure that Docker is installed on your system.
2.  Clone the Repository: Clone the frontend application repository to your local machine.
3.  Navigate to Project Directory: Open a terminal and navigate to the root directory of the frontend application.
4.  Build Docker Image: Run the command `docker build -t frontend-app:dev .` to build the Docker image.
5.  Run Docker Container: Execute `docker run -p 5173:5173 frontend-app:dev` to start a container based on the built image.
6.  Access the Application: Open a web browser and navigate to `http://localhost:5173` to access the running frontend application.

### Containerize Frontend Application from Remote Git Repository

1.  Build Docker Image:

    Use this command to build a Docker image directly from the remote Git repository:

    `docker build -t https://github.com/Linggos06/innoscripta_assessment`

    This command pulls your frontend application code from the given GitHub repository and packages it into a Docker image.

2.  Identify Docker Image ID:

    After the image is built, run this command to see a list of Docker images on your system:

    `docker images`

    Look for the newly created image in the output and note its ID.

3.  Run Docker Container:

    Start a Docker container based on the built image with this command:

    `docker run -p 5173:5173 [image ID]`

    Replace `[image ID]` with the ID you noted in the previous step. This command runs your frontend application inside a Docker container, making it accessible at `http://localhost:5173` in your web browser.
