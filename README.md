# Task Manager Full Stack Application

A full-stack Task Manager app with a React frontend, Spring Boot backend, and MariaDB database, all containerized with Docker Compose.

---

## Technologies Used

### Frontend
- **Framework:** React (with Vite for fast development and build)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Other:** Modern React features (hooks, functional components), Nginx for production build serving

### Backend
- **Framework:** Spring Boot (Java 21)
- **ORM:** JPA/Hibernate
- **API:** RESTful endpoints
- **Database:** MariaDB
- **Other:** Automatic schema generation, Swagger UI for API documentation

---

## Testing

### Frontend
- Unit and component tests are written using **Jest** and **React Testing Library**.
- To run frontend tests:
  ```sh
  cd todo-frontend
  npm install
  npm test or npx jest

  ```

### Backend
- Unit and integration tests are written using **JUnit** and **Spring Boot Test**.
- To run backend tests:
  ```sh
  cd Todo-BAckend
  ./mvnw test or mvn test

  ```

---

## Quick Start
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Task-Manager
   ```
2. **Start all services:**
   ```sh
   docker-compose up --build
   ```
3. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080](http://localhost:8080)
   - Swagger UI: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

## Application Functionalities
- Create, read, update, and delete tasks (CRUD operations)
- View all tasks in a list
- Search and filter tasks
- Responsive UI for desktop and mobile
- API documentation available via Swagger UI

---

## Future Improvements
- Add user authentication and authorization
  - Implement basic authentication for simple user login
  - Add token-based authentication (JWT) for secure API access
- Allow users to register and manage their own tasks


---

## Database Credentials
- **Database:** todo
- **User:** todouser
- **Password:** todopassword
- **Root Password:** rootpassword

---

## Common Commands
- Start all: `docker-compose up`
- Stop all: `docker-compose down`
- Remove data: `docker-compose down -v`
- View logs: `docker-compose logs [service]`

---

## Troubleshooting
- **Port conflicts:** Change port mappings in `docker-compose.yml` if needed.
- **Database not connecting:** Ensure MariaDB is healthy: `docker-compose ps`
- **Frontend not loading:** Ensure backend is running at [http://localhost:8080](http://localhost:8080)
- **Build issues:** Clean Docker cache: `docker system prune -a`




