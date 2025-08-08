
## E-Commerce Platform (Next.js + Prisma + Docker + MySQL)

A modern and scalable e-commerce platform built with **Next.js**, **Prisma ORM**, **MySQL**, and containerized using **Docker**. Includes Clerk authentication, an admin dashboard, and a responsive frontend.

## Table of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
  - [Install Dependencies](#-install-dependencies)
- [Docker + MySQL](#-docker--mysql)
  - [Docker Services Configured](#️-docker-services-configured)
  - [MySQL Credentials](#-mysql-credentials)
- [Environment Variables](#-environment-variables)
- [Prisma & Database Setup](#-prisma--database-setup)
- [Run Dev Server](#-run-dev-server)
- [Adminer DB UI](#-adminer-db-ui)
- [Project Structure](#-project-structure)
- [Deployment](#️-deployment)
- [Common Scripts](#-common-scripts)
- [Resources](#-resources)
- [Author](#-author)



## Features

- Built with **Next.js App Router**
- Authentication via **Clerk**
- Multi-store **e-commerce** features
- **Prisma ORM** + MySQL database
- Containerized with **Docker**
- Admin interface to manage your store
- Responsive frontend design

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name


### Install Dependencies

```bash
npm install
# or
yarn install
```

---

## Docker + MySQL

The project includes a preconfigured `docker-compose.yml` to run:

* MySQL 8.0
* Adminer DB interface (UI)

### Start Docker Services

Make sure Docker is running, then:

```bash
docker-compose up -d
```

### Docker Services Configured

| Service | Port   | Description            |
| ------- | ------ | ---------------------- |
| MySQL   | `3306` | MySQL database         |
| Adminer | `8080` | DB UI (browser access) |

### MySQL Credentials

| Key      | Value        |
| -------- | ------------ |
| Host     | `localhost`  |
| Port     | `3306`       |
| User     | `meriem`     |
| Password | `meriempass` |
| Database | `myappdb`    |

---

## Environment Variables

Create a `.env` file in the root and paste this:

```env
DATABASE_URL="mysql://meriem:meriempass@localhost:3306/myappdb"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
```

> Replace `your-clerk-publishable-key` with your actual Clerk key.

---

## Prisma & Database Setup

Run Prisma commands to sync the schema:

```bash
npx prisma db push
npx prisma generate
```

---

## Run Dev Server

Launch your app locally:

```bash
npm run dev
```

Open your browser at:

[http://localhost:3000](http://localhost:3000)

---

## Adminer DB UI

Visit: [http://localhost:8080](http://localhost:8080)

Use these credentials:

* **System**: MySQL
* **Server**: `mysql` (or `localhost`)
* **Username**: `meriem`
* **Password**: `meriempass`
* **Database**: `myappdb`

---

## Project Structure

```
.
├── app/                      # Next.js app router
│   └── dashboard/            # Admin dashboard
├── prisma/                   # Prisma schema & migrations
├── lib/                      # Prisma client & utils
├── components/               # Reusable UI components
├── public/                   # Static files
├── docker-compose.yml        # Docker config for MySQL + Adminer
├── .env                      # Environment variables
├── README.md                 # Project documentation
```

---

## Deployment

You can deploy this project on:

* [Vercel](https://vercel.com/) — ideal for Next.js frontend
* [Railway](https://railway.app/), [Render](https://render.com/) — for MySQL or fullstack

Update your `.env` if DB is hosted externally:

```env
DATABASE_URL="mysql://user:password@remote-host:3306/dbname"
```

---

## Common Scripts

| Script                | Description                     |
| --------------------- | ------------------------------- |
| `npm run dev`         | Start development server        |
| `npx prisma db push`  | Sync Prisma schema to database  |
| `npx prisma generate` | Generate Prisma client          |
| `docker-compose up`   | Start Docker services           |
| `docker-compose down` | Stop and remove Docker services |

---

## Resources

* [Next.js Documentation](https://nextjs.org/docs)
* [Prisma ORM Docs](https://www.prisma.io/docs)
* [Clerk Auth Docs](https://clerk.com/docs)
* [Docker Docs](https://docs.docker.com/)
* [Adminer Tool](https://www.adminer.org/)

---

## Author

Made by **Meriem Chami**

---

