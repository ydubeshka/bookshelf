# 📚 BookShelf Dashboard

A full-stack web application for searching books and managing a personal library. This project is designed to demonstrate API design skills, relational database management, and the creation of a modern, reactive user interface.

## ✨ Key Features

* **Smart Book Catalog:** Search by title and filter by genre.
* **Dynamic Pagination:** Optimized catalog loading without overloading the database (using `OFFSET`/`LIMIT` on the backend and dynamic calculations on the frontend).
* **Personal Shelf Management:**
    * Add books to your personal collection.
    * Change reading statuses (*Want to read*, *Reading*, *Read*).
    * Rate books (rating functionality is exclusively available for fully read books).
* **Route Guards:** JWT token-based authorization. Unauthorized attempts to access protected features trigger smooth intercepts with elegant push notifications.
* **Optimized UI/UX:** Utilizes React Suspense and Skeleton components for seamless data loading. Instant UI updates during mutations without page reloads.

## 🛠 Tech Stack

**Frontend:**
* **React 18** (Vite) + **TypeScript**
* **TanStack Query (React Query)** — Caching, data invalidation, and asynchronous state management.
* **React Router Dom** — Routing and protected private routes.
* **Tailwind CSS** + **shadcn/ui** — Styling and pre-built accessible components.
* **Sonner** — Elegant toast notification system.

**Backend:**
* **FastAPI** (Python 3.12) — High-performance asynchronous web framework.
* **SQLAlchemy 2.0** (Async) — ORM for database interactions. Utilizes eager loading (`joinedload`) to solve the N+1 query problem when fetching complex nested relationships (Book -> Authors).
* **Alembic** — Database migration tool.
* **Pydantic V2** — Strict incoming data validation and response serialization.
* **PostgreSQL** — Primary relational database.

**Infrastructure:**
* **Docker** & **Docker Compose** — Full project containerization for rapid deployment (frontend hot-reloading is configured inside the container).

## 🚀 How to Run Locally

The project is fully containerized. You only need [Docker](https://www.docker.com/) and Docker Compose installed on your machine.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name
   ```

2. **Run the containers:**
   Execute the following command in the root directory (where `docker-compose.yml` is located):
   ```bash
   docker compose up --build -d
   ```
   *(Note: During the first startup, the database may take a few seconds to initialize).*

3. **Apply Database Migrations:**
   Once the containers are up, run Alembic to create the necessary tables in the database:
   ```bash
   docker compose exec backend alembic upgrade head
   ```

4. **Seed the Database:**
   Populate the catalog with initial data (books, authors, genres) so the application isn't empty:
   ```bash
   docker compose exec backend python src/seed.py
   ```
   *(Note: Adjust the path to `seed.py` if your folder structure differs).*

5. **Access the application:**
   * Frontend is available at: [http://localhost:5173](http://localhost:5173)
   * Interactive API documentation (Swagger) is available at: [http://localhost:8000/docs](http://localhost:8000/docs)
