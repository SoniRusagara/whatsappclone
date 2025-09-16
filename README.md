---

# WhatsApp Clone (Spring Boot, Angular 19, Keycloak, WebSockets)

A real-time messaging app built with **Spring Boot** (backend) and **Angular 19** (frontend). Secured with **Keycloak**, uses **WebSockets** for instant chat, and supports media upload.

**Highlight:** End-to-end auth with Keycloak + live messaging over WebSockets; modular services for chats, messages, notifications, and files.

---

## Features

* 💬 1–1 chats with real-time delivery (STOMP/WebSocket)
* 🔐 SSO/OIDC via **Keycloak** (access/refresh tokens, roles)
* 👥 User sync (Keycloak → app users)
* 🗂️ Chat & Message domains with pagination
* 🖼️ Media upload (images/video) with server storage
* 🔔 In-app notifications + auto-scroll
* 🧰 OpenAPI/Swagger for API docs
* 🧪 Backend tests for core flows

---

## Tech Stack

* **Backend:** Spring Boot 3, Spring Security, WebSocket (STOMP), Spring Data JPA/Hibernate
* **Auth:** Keycloak (OIDC)
* **DB:** Postgres (recommended) or H2 (dev)
* **Frontend:** Angular 19, RxJS, Bootstrap
* **Build/Dev:** Maven, Docker Compose (Keycloak + Postgres)

---

## Getting Started

### Requirements

* JDK 17+
* Maven 3.9+
* Node 18+ / npm 9+
* Docker (for Keycloak/Postgres)

### 1) Backend (Spring Boot)

```bash
git clone https://github.com/<your-username>/whatsappclone.git
cd whatsappclone
# Start infra (Keycloak + Postgres)
docker compose up -d
# Run backend
./mvnw spring-boot:run
```

**Environment (example):** `src/main/resources/application.yml`

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/whatsapp
    username: whatsapp
    password: whatsapp
  jpa:
    hibernate:
      ddl-auto: update
    open-in-view: false

keycloak:
  issuer-uri: http://localhost:8080/realms/whatsapp
  client-id: whatsapp-client
  client-secret: <if-confidential>
```

**WebSocket endpoint (default):**

```
/ws   (SockJS/STOMP)
topic: /topic/chats/{chatId}
queue: /queue/notifications
```

### 2) Frontend (Angular 19)

```bash
# from repo root (or wherever you keep UI)
ng new whatsapp-clone-ui
cd whatsapp-clone-ui
npm install
ng serve -o
```

Add your **Keycloak** config (e.g., `src/environments/environment.ts`):

```ts
export const environment = {
  apiBaseUrl: 'http://localhost:8081/api', // Spring Boot port
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'whatsapp',
    clientId: 'whatsapp-client'
  },
  wsUrl: 'http://localhost:8081/ws'
};
```

Add an **HTTP interceptor** to attach the bearer token, and a **WebSocket service** (STOMP) using the `wsUrl`.

---

## Run

* **Backend:** [http://localhost:8081](http://localhost:8081) (Swagger at `/swagger-ui.html` or `/swagger-ui/index.html`)
* **Keycloak:** [http://localhost:8080](http://localhost:8080) (Realm: `whatsapp`)
* **Frontend:** [http://localhost:4200](http://localhost:4200)

---

## Troubleshooting

### `zsh: command not found: ng`

Angular CLI isn’t installed globally.

```bash
npm i -g @angular/cli
# Then restart the terminal or:
source <(ng completion script)
```

### CORS / WebSocket blocked

* Enable CORS for REST **and** allow origins on the WebSocket config (`setAllowedOrigins("http://localhost:4200")`).
* If using SockJS, match `/ws` endpoint paths between backend and UI.

### Keycloak login loop / 401

* Verify **realm**, **clientId**, and **redirect URIs** in Keycloak.
* For confidential clients, set `client-secret` in backend and rotate tokens.

---

## Roadmap

* ✅ Chats/messages, auth, WebSockets, media upload
* 🔜 Group chats, message read receipts, typing indicators
* 🔜 File thumbnails & video previews
* 🔜 Push notifications (web + mobile wrapper)
* 🔜 Dockerized full stack (backend + UI in one compose)

---

## License

MIT (or your preference)

---

## Contact

Created by **Soni Rusagara** — happy to connect!

