# emsee

This is an event management system designed for clubs that allows users to create, manage, and attend events.


## How to get setup

1. Clone the repository
2. Install dependencies using `pnpm install`
3. Create a `.env` file in the root directory and add the following environment variables:
   - `DATABASE_URL`: The URL of your database (e.g., `postgresql://postgres:postgres@localhost:5432/emsee`)
   - `POSTGRES_USER`: The PostgreSQL username (default: `postgres`)
   - `POSTGRES_PASSWORD`: The PostgreSQL password (default: `postgres`)
   - `POSTGRES_DB`: The name of the PostgreSQL database (default: `emsee`)
4. Start the database using Docker:
   `docker compose up`
5. In another terminal, push the database schema and seed it:
   `pnpm db:push && pnpm db:seed`
6. Start the development server:
   `pnpm dev`

