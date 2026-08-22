# Distributed Library Application

A book catalogue and personal reading-list application built as three separate services,
containerized with Docker and deployed on Kubernetes behind an Istio gateway.

---

## Project Objective

The goal of this project is to:

- Split a monolithic web application into independently deployable services
- Containerize each service and orchestrate them with Kubernetes
- Expose everything through a single entry point using an Istio service mesh
- Automate builds and tests with a CI pipeline

This project was built for a distributed programming course.

---

## Architecture

```
                     Browser
                        |
                     HTTPS
                        |
            Istio Ingress Gateway
         (TLS + HTTP -> HTTPS redirect)
                        |
                  VirtualService
        |               |               |
 /api/catalog/*   /api/client/*        /*
        |               |               |
 catalogservice   clientservice     frontend
    (:8080)          (:8081)      (:80, x2 replicas)
        |               |
        +-------+-------+
                |
             MySQL
```

Everything is served from one hostname, so the front-end calls the APIs by path
(`/api/catalog`, `/api/client`) instead of talking to separate origins.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Front-end | React 18, MUI, Bootstrap, Axios |
| Services | Spring Boot 3.4, Java 17, Spring Data JPA, Gradle |
| Database | MySQL |
| Containers | Docker (multi-stage build for the front-end) |
| Orchestration | Kubernetes + Istio |
| CI | GitHub Actions |

---

## Services

### catalog-service (port 8080)

Read-only access to the book catalogue.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/books` | List books |
| `GET` | `/books/search?query=` | Search the catalogue |
| `GET` | `/books/{id}` | Get one book |

### client-service (port 8081)

Users, authentication and reading lists.

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/auth/login` | Log in |
| `GET` | `/users/{userId}/books` | Get the user's list |
| `POST` | `/users/{userId}/books/{bookId}` | Add a book |
| `PUT` | `/users/{userId}/books/{bookId}/mark-read` | Mark as read |
| `PUT` | `/users/{userId}/books/{bookId}/rate/{rating}` | Rate a book (0-10) |

### front-end (port 80)

React SPA: browse, search, book details, login/register, personal list.

---

## Repository Structure

```
.
├── catalog-service/              # Spring Boot service
├── client-service/               # Spring Boot service
├── front-end/                    # React application
├── deployment.yaml               # Kubernetes + Istio manifests
└── .github/workflows/actions.yml # CI pipeline
```

---

## How to Run

### Option 1 — Locally

Requirements: JDK 17, Node 20, Docker, and a MySQL instance with the `bibliotheque` schema.

1. Start the services:

```
cd catalog-service && ./gradlew bootRun
cd client-service  && ./gradlew bootRun
```

2. Start the front-end:

```
cd front-end
npm install
npm start
```

### Option 2 — On Kubernetes

Requirements: a cluster with Istio installed and a TLS secret in the `istio-system` namespace.

1. Enable sidecar injection:

```
kubectl label namespace default istio-injection=enabled
```

2. Deploy:

```
kubectl apply -f deployment.yaml
```

3. Get the gateway IP and point your domain at it:

```
kubectl get svc istio-ingressgateway -n istio-system
```

The domain is set in the `Gateway` section of `deployment.yaml` — change it to your own.

---

## Configuration

Database settings are read from environment variables, so nothing needs to be edited in
the code:

| Variable | Description |
| --- | --- |
| `SPRING_DATASOURCE_URL` | JDBC URL |
| `SPRING_DATASOURCE_USERNAME` | Database user |
| `SPRING_DATASOURCE_PASSWORD` | Database password |

On Kubernetes, pass the credentials from a `Secret` rather than writing them in the
manifest.

---

## CI

`.github/workflows/actions.yml` runs on every pull request and builds all three services
in parallel: Gradle build and tests for the two Java services, `npm run build` for the
front-end, then a Docker image build for each.

---

## Limitations

- Both services share the same database, so they are not fully independent
- Login returns a user id instead of a token — no real session management yet
- Passwords are hashed with SHA-256 without a salt
- The CI pipeline builds images but does not deploy them
- No liveness or readiness probes in the manifests
