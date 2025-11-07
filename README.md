## Quick Start

- Prerequisites: Docker and Docker Compose installed.
- From the repo root, start the stack:

  ```sh
  docker-compose up --build
  ```

- UI: http://localhost:8080 (container serves on 3000, mapped to host 8080)
- API: http://localhost:4000
- MySQL: bound to host `${DB_FORWARD_PORT:-3307}` → container `3306`.

Tips
- Restart fresh (wipe DB volume): `docker-compose down -v && docker-compose up --build`
- Env overrides: edit `.env` at repo root (e.g., `UI_PORT`, `API_PORT`, `DB_*`).

## Credentials

- Database (MySQL):
  - User: `root`
  - Password: `${DB_PASS}` (defaults to `123456`)
  - Database: `${DB_NAME}` (defaults to `app_db`, repo `.env` may set `mdms_lite`)
- API tokens/auth: none required for local use.

## Design Notes

- API is a Node.js/Express service using Sequelize (MySQL) with underscored column naming. Models live under `api-server/src/models` and are synced on startup (`sequelize.sync()`).
- A lightweight process manager uses Node `worker_threads` to simulate device workers; workers emit messages that persist as transactions via the service layer.
- The API reads configuration from a root `.env`; Compose injects DB and port settings. On boot, the API ensures the database exists and then syncs tables.
- The UI is a React app (CRA 5) served in dev mode inside a container, proxied to the API via the Compose service name (`api`). Host port 8080 maps to the container’s 3000.
- Docker Compose adds a MySQL healthcheck and starts the API after the database is healthy to avoid race conditions at startup.

## 📸 Screenshots

<p align="center">
  <strong>Create Device</strong><br/>
  <img src="docs/images/Screenshot-(610).png" alt="Create Device" width="900">
</p>

<p align="center">
  <strong>Device List</strong><br/>
  <img src="docs/images/Screenshot-(611).png" alt="Device List" width="900">
</p>

<p align="center">
  <strong>Recent Transactions</strong><br/>
  <img src="docs/images/Screenshot-(612).png" alt="Transactions" width="900">
</p>

