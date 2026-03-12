# Enterprise AI Assistant Architecture

A full-stack, containerized monorepo demonstrating modern AI integration patterns, reactive UI state management, and API design. This project serves as a blueprint for bridging component-based frontends with flexible, asynchronous AI backend layers.

## 🏗️ Architecture & Tech Stack

This project strictly separates the presentation layer from the business/AI logic using a GraphQL API gateway.

### Frontend

- **Framework:** Angular 21
- **State Management:** Angular Signals (bypassing Zone.js for optimized, surgical DOM updates)
- **API Client:** Apollo-Angular
- **Styling:** CSS3 / HTML5

### Backend

- **Core:** Python 3.11 with FastAPI (for high-performance, asynchronous routing)
- **API Layer:** Strawberry GraphQL (Code-first, type-hinted GraphQL implementation)
- **AI Layer:** Asynchronous simulation module (designed for plug-and-play local LLM integration)

### Infrastructure

- **Containerization:** Docker & Docker Compose
- **Web Server:** Nginx (serving the compiled Angular static assets)

## ✨ Key Features

- **GraphQL API Gateway:** Utilizes mutations for AI prompt processing and queries for fetching conversation history.
- **GraphiQL IDE Integration:** Built-in endpoint (`/graphql`) for self-documenting API exploration and independent backend testing.
- **Reactive UI:** Leverages Angular Signals for seamless, glitch-free UI updates during asynchronous AI processing delays.
- **Production-Ready Docker Environment:** Multi-stage builds for the frontend and a lightweight Python environment for the backend, orchestrated via Docker Compose.

## 🚀 Getting Started

### Prerequisites

- Docker Desktop installed and running.

### Installation & Execution

1. Clone the repository:

   ```bash
   git clone [https://github.com/YourUsername/ai-portfolio.git](https://github.com/YourUsername/ai-portfolio.git)
   cd ai-portfolio
   ```

2. Spin up the containers:

   ```bash
   docker compose up --build

   ```

3. Access the application:

   Frontend UI: http://localhost:4200

   GraphiQL Interface: http://localhost:8000/graphql

🗺️ Roadmap

[x] Initial full-stack monorepo setup

[x] GraphQL schema definition and Angular Apollo integration

[x] State management migration to Angular Signals

[x] Dockerization and Nginx configuration

[x] History implementation

[ ] Integration with local LLM (e.g., Ollama / Llama 3) for real-time generative responses

[ ] Implement database persistence (PostgreSQL/SQLite) for chat history
