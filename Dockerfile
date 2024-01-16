# Build the application
FROM maven:3.8.1-openjdk-17-slim as build

# Set the working directory
WORKDIR /app

COPY ./DTO/pom.xml ./DTO/pom.xml
COPY ./DTO/src ./DTO/src
RUN mvn -f ./DTO/pom.xml clean install

COPY ./GroovieLiveSpringSong/pom.xml ./GroovieLiveSpringSong/pom.xml
COPY ./GroovieLiveSpringSong/src ./GroovieLiveSpringSong/src
RUN mvn -f ./GroovieLiveSpringSong/pom.xml clean package

# Run the application
FROM openjdk:17-jdk-slim
COPY --from=build /app/GroovieLiveSpringSong/target/GroovieLiveSpringSong-0.0.1-SNAPSHOT.jar /GroovieLiveSpringSong-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/GroovieLiveSpringSong-0.0.1-SNAPSHOT.jar"]