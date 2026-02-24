# 📝 Markdown Notes App (MERN Stack)

A modern full-stack Markdown Notes application built using **MongoDB, Express, React, Node.js**, and **TailwindCSS**.  
It supports live Markdown preview, note management, and search functionality.

---

## 🚀 Features

- ✅ Create, edit, delete notes
- ✅ Live Markdown preview
- ✅ Search & filter notes
- ✅ Responsive UI with TailwindCSS
- ✅ RESTful API
- ✅ MongoDB persistence

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- Axios
- react-markdown

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- cors

---

## 📂 Project Structure
markdown-notes-mern/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env
│
└── frontend/
├── src/
├── public/
└── vite.config.js


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/usk1999/markdown.git
cd markdown
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/markdown_notes

Run backend:

npm run dev
3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev

Open in browser:

http://localhost:5173

🌐 API Endpoints
Method	Endpoint	Description
GET	/api/notes	Get all notes
POST	/api/notes	Create note
PUT	/api/notes/:id	Update note
DELETE	/api/notes/:id	Delete note

🚀 Deployment
Frontend → Vercel
Backend → Render
Database → MongoDB Atlas

🔮 Future Enhancements

🔐 User Authentication (JWT)

📄 Export as PDF / DOCX

☁️ Cloud Sync

📱 Progressive Web App (PWA)

🌙 Dark Mode

👨‍💻 Author

Uma Sai Naguboina

GitHub: https://github.com/usk1999

MIT License



