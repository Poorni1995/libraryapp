# Use official OpenJDK as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged JAR file into the container
COPY target/libraryapp-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 to the outside world
EXPOSE 8080


ENTRYPOINT ["java", "-jar", "app.jar"]

#buid the docker image (-t libraryapp)
#run the docker container (docker run -p 8080:808 libraryapp)
#verify docker running(docker ps)
#stop container(docker stop<container id)

#initialize git (git init)
#connect the local repo to github( git remote add origin https://github.com/Poorni/libraryapp.git)
#add all files(git add)
#make the first commit( git commit -m"Initial commit - Spring Boot Library App setup")
#push the code (git branch -M main )(git push -u origin main)