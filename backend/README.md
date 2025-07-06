# Backend (NestJS API)

This is the backend service for the Graduation Project, built with [NestJS](https://nestjs.com/) and TypeScript. It provides RESTful APIs for authentication, product management, orders, chat, notifications, reviews, and more.

---

## 📦 Features

- User authentication (JWT, OTP)
- Product CRUD operations
- Order management
- Repair requests
- Real-time chat (WebSocket)
- Notifications (in-app, push)
- Reviews system
- Modular architecture (controllers, services, entities)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm
- (Optional) Docker & Docker Compose for containerized DB

### Installation

```bash
cd backend
npm install
```

### Running the Server

```bash
# Development mode
npm run start:dev

# Production build
npm run build
npm run start:prod
```

### Environment Variables

Create a `.env` file in the `backend/` directory. Example:

```
PORT=3001
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
```

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── address/
│   ├── auth/
│   ├── aws/
│   ├── chat/
│   ├── firebase/
│   ├── message/
│   ├── notification/
│   ├── order/
│   ├── product/
│   ├── repair/
│   ├── review/
│   ├── search-history/
│   ├── user/
│   ├── app.module.ts
│   └── main.ts
├── entities/
├── test/
├── package.json
├── tsconfig.json
└── ...
```

---

## 📚 API Documentation

- Swagger UI: [http://localhost:3001/api](http://localhost:3001/api)

---

## 📝 Notes

- Use environment variables for all secrets and sensitive data.
- For production, ensure secrets are not committed to version control.
- See parent [README.md](../README.md) for full-stack and AI module integration.
