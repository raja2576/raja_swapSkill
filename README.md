# 🔄 SkillSwap Platform

A professional and fully-functional platform for exchanging skills. Users can list their skills, browse others’ profiles, request swaps, leave feedback, and manage their availability — all within an intuitive and modern interface.

---

## 🚀 Overview

Watch The Working Demo 

[![Watch the demo](https://img.youtube.com/vi/Pskmh_aRYiw/0.jpg)](https://www.youtube.com/watch?v=Pskmh_aRYiw)




## 🚀 Overview

**SkillSwap** is a peer-to-peer platform where users can:
- Offer their skills
- Request skills from others
- Manage swap requests
- Build a learning and teaching network

Whether you’re great at **Photoshop**, **Excel**, **public speaking**, or **guitar**, SkillSwap lets you find the perfect match to trade knowledge!

---

## 🧠 Key Features

### 👤 User Profiles
- Name, location (optional), profile photo (optional)
- Skills offered and wanted
- Availability (weekends, evenings, etc.)
- Toggle between **public** and **private** profiles

### 🔍 Search & Browse
- Search by skill name (e.g., "Photoshop")
- Filter by availability and location

### 🔁 Swap Requests
- Send, accept, or reject swap offers
- View pending and confirmed requests
- Delete requests if not accepted

### 🌟 Feedback System
- Rate your swap partner after each exchange
- Leave written feedback to help others

### 🛡 Admin Dashboard
- Approve/reject skill descriptions
- Ban users violating policies
- Monitor swap activities
- Broadcast updates and download reports

---

## 💻 Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT + Google OAuth
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Admin UI**: Custom dashboard with moderation tools

---

## 📁 Project Structure

```

/src
│
├── /components
│   ├── HomePage.tsx
│   ├── Header.tsx
│   ├── Auth.tsx
│   ├── Dashboard.tsx
│   ├── Profile.tsx
│   ├── Browse.tsx
│   ├── Swaps.tsx
│   └── Admin.tsx
│
├── /context
│   ├── UserContext.tsx
│   └── SwapContext.tsx
│
├── App.tsx
└── index.css

````

---

## 🌐 Setup & Run Locally

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Git

### Installation

```bash
git clone https://github.com/your-username/skill-swap.git
cd skill-swap
npm install
````

### Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillswap
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Run the App

```bash
# Backend
npm run server

# Frontend (Vite)
npm run dev
```

---

## ✅ Upcoming Features

* Notifications for new swap offers
* Messaging/chat between users
* Profile badges and achievements
* Mobile app (React Native)

---

## 🧑‍💼 Contributing

Want to contribute? Great!

```bash
git checkout -b feature/your-feature-name
git commit -m "Add: Your feature summary"
git push origin feature/your-feature-name
```

Open a Pull Request describing your changes.

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 📣 Credits

Designed and developed by \[Your Name or Team Name]
With ❤️ for peer-to-peer learning and community growth.

```

---

Let me know if you'd like a version tailored for deployment (e.g., with Vercel, Railway, Heroku, etc.) or need help setting up GitHub Actions, Docker, or Swagger API docs.
```
