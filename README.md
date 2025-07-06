# Graduation Project

A full-stack platform for product exchange, repair, and chat, featuring:

- **Backend**: NestJS (TypeScript) REST API with authentication, product/order management, chat, notifications, and review system.
- **Frontend**: Flutter mobile app for users to browse, chat, order, and manage products.
- **AI Modules**:
  - **LSTM Seq2Seq Chatbot** for conversational AI.
  - **Search By Image** for visual product search using deep learning and FAISS.

---

## 🗂️ Project Structure

```
graduation/
│
├── backend/                # NestJS backend API
│   ├── src/                # Source code (controllers, services, entities)
│   ├── test/               # Unit and e2e tests
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend-specific docs
│
├── flutter/                # Flutter mobile app
│   └── lib/                # Dart source code
│
├── AI/
│   ├── lstm-seq2seq-chatbot/   # Chatbot (Python)
│   └── search-by-image/        # Image search (Python, FastAPI)
│
└── README.md               # (You are here)
```

---

## 🚀 Features

- **User Authentication** (JWT, OTP)
- **Product Listings**: Create, update, search, and manage products
- **Order Management**: Place, update, and track orders
- **Repair Requests**: Request and manage product repairs
- **Chat & Messaging**: Real-time chat between users (WebSocket)
- **Notifications**: In-app and push notifications
- **Reviews**: Product and user reviews
- **AI Chatbot**: LSTM-based conversational assistant
- **Image Search**: Find products by image similarity

---

## 🛠️ Getting Started

### 1. Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev
```

- API docs: [http://localhost:3001/api](http://localhost:3001/api)

### 2. Flutter App

```bash
cd flutter
flutter pub get
flutter run
```

### 3. AI Modules

#### LSTM Seq2Seq Chatbot

```bash
cd AI/lstm-seq2seq-chatbot
pip install -r requirements.txt
python inference.py
```

#### Search By Image

```bash
cd AI/search-by-image
pip install -r requirements.txt
python main.py
```

- Web UI: [http://localhost:8000/search](http://localhost:8000/search)

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

This project is for educational purposes.

---

## 📚 Submodules

- [backend/README.md](backend/README.md)
- [AI/lstm-seq2seq-chatbot/README.md](AI/lstm-seq2seq-chatbot/README.md)
- [AI/search-by-image/README.md](AI/search-by-image/README.md)

---

## 👤 Authors

- Mohamed Salama
- Mahmoud Etman
- Mohamed Ibrahim
