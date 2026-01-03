# 📇 Contact Manager

**Contact Management Web Application** built using the **MERN stack**.

---

## ✨ Features

### 🧑‍💼 Contact Management

* Add new contacts with **Name, Email, Phone & Message**
* Edit existing contacts using a modal interface
* Delete contacts instantly
* View contacts .

### 🧠 Smart Form Validation

* Field‑level validation on **blur** (shows error when moving to next input)
* Email & phone format validation
* Submit disabled until form is valid

### 🔍 Search, Filter & Sort

* Search contacts in real‑time
* Filter contacts (A–Z, Z–A)
* Sort by name or email

### 🎨 UI & UX

* Clean, modern, aesthetic design
* Dark mode support
* Hover, focus & transition effects
* Icons for better visual clarity
* Fully responsive (mobile → desktop)

### 🛠️ Backend Capabilities

* REST APIs using Express.js
* MongoDB database with Mongoose schemas
* Export contacts as **JSON file**
* Proper API structure & error handling

---

## 🧰 Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## 📁 Project Structure

```
contact-app/
 ├─ backend/
 │   ├─ models/
 │   │   └─ Contact.js
 │   ├─ db1.js
 │   ├─ server.js
 │   └─ package.json
 │
 ├─ frontend/
 │   ├─ src/
 │   │   ├─ components/
 │   │   │   ├─ ContactCard.jsx
 │   │   │   ├─ ContactList.jsx
 │   │   │   ├─ DeleteContact.jsx
 │   │   │   ├─ AddContactModal.jsx
 │   │   │   ├─ EditContactModal.jsx
 │   │   │   ├─ Header.jsx
 │   │   │   └─ Toolbar.jsx
 │   │   ├─ Helper/
 │   │   │   ├─ InputFeilds.jsx
 │   │   │   └─ SvgIcons.jsx
 │   │   ├─ App.jsx
 │   │   └─ main.jsx
 │   └─ package.json
 │
 ├─ .gitignore
 └─ README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/contact-management-app.git
cd contact-management-app
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=mongodb://127.0.0.1:27017/contactApp
PORT=5000
```

Start backend server:

```bash
node server.js
```

Backend will run on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run on:

```
http://localhost:5173
```

---

Backend will run on:

```
http://localhost:5000
```

---

## 🔗 API Endpoints

### ➕ Add Contact

```
POST /contacts
```

### 📥 Get All Contacts

```
GET /contacts
```

### ✏️ Update Contact

```
PUT /contacts/:id
```

### ❌ Delete Contact

```
DELETE /contacts/:id
```

### 📤 Export Contacts (JSON)

```
GET /export
```

---


## 🧪 Validation Rules

* Name: Required
* Email: Required & valid format
* Phone: Required & 10‑digit number
* Message: Optional

---
