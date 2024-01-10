# Build the application
FROM maven:3.8.1-openjdk-17-slim as build

# Set the working directory
WORKDIR /app

COPY ./DTO/pom.xml ./DTO/pom.xml
COPY ./DTO/src ./DTO/src
RUN mvn -f ./DTO/pom.xml clean install

COPY ./GroovieLiveSpring/pom.xml ./GroovieLiveSpring/pom.xml
COPY ./GroovieLiveSpring/src ./GroovieLiveSpring/src
RUN mvn -f ./GroovieLiveSpring/pom.xml clean package

# Run the application
FROM openjdk:17-jdk-slim
COPY --from=build /app/GroovieLiveSpring/target/GroovieLiveSpring-0.0.1-SNAPSHOT.jar /GroovieLiveSpring-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/GroovieLiveSpring-0.0.1-SNAPSHOT.jar"]