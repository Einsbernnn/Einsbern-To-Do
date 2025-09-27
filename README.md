# Einsbern To-Do Application

A modern full-stack to-do application built with **Spring Boot** backend and **Vue.js** frontend, containerized with Docker.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd Einsbern-To-Do

# Start the entire application stack
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080/api/hello
```

## 📋 Table of Contents

- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Docker Development](#-docker-development)
- [API Documentation](#-api-documentation)
- [Frontend Development](#-frontend-development)
- [Backend Development](#-backend-development)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)

## 🏗 Architecture

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   Vue.js SPA    │ ──────────────► │  Spring Boot    │
│   (Frontend)    │                 │   (Backend)     │
│   Port: 3000    │ ◄────────────── │   Port: 8080    │
└─────────────────┘                 └─────────────────┘
         │                                   │
         │                                   │
    ┌─────────┐                         ┌─────────┐
    │  Nginx  │                         │ Tomcat  │
    │ (Serve) │                         │ (Serve) │
    └─────────┘                         └─────────┘
```

**Tech Stack:**
- **Frontend**: Vue.js 3, TypeScript, Vite, Nginx
- **Backend**: Spring Boot 3.5.6, Java 21, Maven, Embedded Tomcat
- **Containerization**: Docker, Docker Compose
- **Development**: Hot reloading, multi-stage builds

## 🔧 Prerequisites

- **Docker** & **Docker Compose** (recommended)
- **Java 21+** (for local backend development)
- **Node.js 20+** (for local frontend development)
- **Maven 3.9+** (for local backend development)

## 📦 Installation & Setup

### Option 1: Docker Compose (Recommended)

```bash
# Start both frontend and backend
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### Option 2: Individual Docker Containers

```bash
# Build and run backend
docker build -t einsbern-to-do-backend .
docker run -d -p 8080:8080 --name backend einsbern-to-do-backend

# Build and run frontend
docker build -f frontend/dockerfile -t einsbern-to-do-frontend frontend/
docker run -d -p 3000:80 --name frontend einsbern-to-do-frontend
```

### Option 3: Local Development

#### Backend Setup
```bash
cd backend
./mvnw spring-boot:run
# Backend will be available at http://localhost:8080
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Frontend will be available at http://localhost:5173 (Vite default)
```

## 🐳 Docker Development

### Managing Containers

```bash
# View running containers
docker ps --filter "name=einsbern-to-do"

# View container logs
docker logs einsbern-to-do-backend
docker logs einsbern-to-do-frontend

# Stop containers
docker stop einsbern-to-do-backend einsbern-to-do-frontend

# Remove containers
docker rm einsbern-to-do-backend einsbern-to-do-frontend

# Remove images
docker rmi einsbern-to-do-backend einsbern-to-do-frontend
```

### Fresh Rebuild

```bash
# Complete clean rebuild (recommended for major changes)
docker-compose down
docker system prune -f
docker-compose up --build -d
```

### Individual Container Rebuilds

```bash
# Rebuild backend only
docker stop einsbern-to-do-backend && docker rm einsbern-to-do-backend
docker rmi einsbern-to-do-backend
docker build -t einsbern-to-do-backend .
docker run -d -p 8080:8080 --name einsbern-to-do-backend einsbern-to-do-backend

# Rebuild frontend only
docker stop einsbern-to-do-frontend && docker rm einsbern-to-do-frontend
docker rmi einsbern-to-do-frontend
docker build -f frontend/dockerfile -t einsbern-to-do-frontend frontend/
docker run -d -p 3000:80 --name einsbern-to-do-frontend einsbern-to-do-frontend
```

## 🌐 API Documentation

### Base URLs
- **Development**: `http://localhost:8080`
- **Production**: TBD

### Endpoints

#### Health Check
```http
GET /api/hello
```

**Response:**
```
Hello from Spring Boot!
```

**cURL Example:**
```bash
curl http://localhost:8080/api/hello
```

### Future API Endpoints (To be implemented)

```http
# To-Do Management
GET    /api/todos          # Get all todos
POST   /api/todos          # Create new todo
GET    /api/todos/{id}     # Get specific todo
PUT    /api/todos/{id}     # Update todo
DELETE /api/todos/{id}     # Delete todo
```

## 🎨 Frontend Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Key Technologies

- **Vue.js 3**: Composition API with `<script setup>` syntax
- **TypeScript**: Type safety and better development experience
- **Vite**: Fast build tool and dev server
- **Nginx**: Production web server (in Docker)

### Development Workflow

1. Make changes in `frontend/src/`
2. Vite will automatically reload the browser
3. For Docker testing: rebuild frontend container

## ⚙️ Backend Development

### Available Scripts

```bash
# Run development server
./mvnw spring-boot:run

# Run tests
./mvnw test

# Build JAR
./mvnw clean package

# Build without tests
./mvnw clean package -DskipTests
```

### Key Technologies

- **Spring Boot 3.5.6**: Modern Java framework
- **Spring Web**: REST API development
- **Java 21**: Latest LTS Java version with enhanced performance
- **Maven**: Dependency management and build tool
- **Embedded Tomcat**: Application server

### Development Workflow

1. Make changes in `backend/src/main/java/`
2. Spring Boot DevTools will automatically reload
3. For Docker testing: rebuild backend container

## 📁 Project Structure

```
Einsbern-To-Do/
├── frontend/                   # Vue.js Frontend
│   ├── src/
│   │   ├── components/        # Vue components
│   │   ├── views/            # Page components
│   │   └── main.ts           # App entry point
│   ├── public/               # Static assets
│   ├── dockerfile            # Frontend Docker config
│   ├── package.json          # Node.js dependencies
│   ├── vite.config.ts        # Vite configuration
│   └── tsconfig.json         # TypeScript config
│
├── backend/                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/java/com/einsbern_to_do/backend/
│   │   │   ├── BackendApplication.java    # Main app class
│   │   │   └── HelloController.java       # REST controller
│   │   └── test/             # Unit tests
│   ├── pom.xml               # Maven dependencies
│   ├── dockerfile            # Backend Docker config
│   └── mvnw                  # Maven wrapper
│
├── docker-compose.yml         # Multi-container setup
├── Dockerfile                # Main backend Docker config
├── .dockerignore             # Docker ignore rules
└── README.md                 # This file
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow **Spring Boot** best practices for backend
- Use **Vue.js 3 Composition API** for frontend
- Write **meaningful commit messages**
- Add **tests** for new features
- Update **documentation** as needed

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find and kill process using port 8080
lsof -ti:8080 | xargs kill -9

# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

#### Docker Issues
```bash
# Clean up all Docker resources
docker system prune -af
docker volume prune -f

# Restart Docker Desktop (macOS)
```

#### Backend Not Starting
```bash
# Check Java version
java --version

# Check Maven
./mvnw --version

# Check application logs
docker logs einsbern-to-do-backend
```

#### Frontend Build Failures
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Container Health Checks

```bash
# Check container status
docker ps

# Check container health
docker inspect einsbern-to-do-backend | grep -A 5 Health

# Test API endpoints
curl http://localhost:8080/api/hello
curl http://localhost:3000
```

### Logs and Debugging

```bash
# View real-time logs
docker logs -f einsbern-to-do-backend
docker logs -f einsbern-to-do-frontend

# View Docker Compose logs
docker-compose logs -f
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an [Issue](../../issues)
- Check the [Troubleshooting](#-troubleshooting) section
- Review Docker and application logs

---

**Happy Coding!** 🚀