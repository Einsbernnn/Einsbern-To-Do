# Multi-stage build for Spring Boot backend application

# ---- Stage 1: Build ----
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Set working directory
WORKDIR /app

# Copy pom.xml first for better layer caching
COPY backend/pom.xml ./
COPY backend/.mvn ./.mvn
COPY backend/mvnw ./

# Download dependencies (this layer will be cached unless pom.xml changes)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY backend/src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# ---- Stage 2: Runtime ----
FROM eclipse-temurin:21-jre

# Create app user for security
RUN addgroup --gid 1001 --system appgroup && \
    adduser --uid 1001 --system --ingroup appgroup appuser

# Set working directory
WORKDIR /app

# Copy the built jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Change ownership of the app directory
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose the port the app runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]