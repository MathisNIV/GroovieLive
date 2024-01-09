FROM openjdk:19
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/GroovieLiveSpring-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} GroovieLiveSpring-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/GroovieLiveSpring-0.0.1-SNAPSHOT.jar"]