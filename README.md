
# 🧠 Daksh - Frontend

This is the **frontend** for **Daksh**, a cutting-edge SaaS-based study assistant for students and educators. Built with **Next.js 14 App Router**, **TailwindCSS**, and **TypeScript**, it provides a clean, responsive, and intuitive user interface to interact with Daksh's AI-powered backend.

---

## 📁 Project Structure

```
src/
│
├── app/                        # Main application routing (Next.js App Router)
│   ├── (auth)/                # Authentication routes (e.g., login, signup)
│   ├── about/                 # About page
│   ├── ai-assist/             # AI assistant features
│   ├── community/             # Community dashboard & viewer
│   │   └── [communityid]/     # Dynamic community ID route
│   ├── contact/               # Contact page
│   ├── home/                  # Homepage
│   ├── privacy-policy/        # Privacy policy
│   ├── subject/               # Subject-specific content
│   ├── todo/                  # To-do dashboard
│   ├── api/                   # Route handlers (for client-side API logic)
│   ├── layout.tsx            # App-wide layout
│   ├── middleware.ts         # Auth middleware (e.g., route guards)
│   └── page.tsx              # Root landing page
│
├── components/                # Reusable UI components
├── public/                    # Static assets (images, icons, etc.)
├── styles/                    # Global styles (if separate from Tailwind)
├── .env.local                 # Environment variables
├── globals.css                # Global CSS (Tailwind entry point)
├── tsconfig.json              # TypeScript config
└── next.config.js             # Next.js configuration
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

- **Node.js** (v16+)
- **npm** or **yarn**
- **Backend API** should be running (see [Daksh Backend](https://github.com/your-repo/backend-daksh))

### 2️⃣ Setup

```bash
# Clone the repo
git clone https://github.com/AngadSudan/daksh-saas-frontend.git
cd daksh-saas-frontend

# Install dependencies
npm install

# Create local environment config
cp .env.example .env.local

# Start development server
npm run dev
```

### 3️⃣ Build for Production

```bash
npm run build
npm run start
```

---

## 🌍 Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_CLOUDINARY_URL=your_cloudinary_link
```

---

## 💡 Key Features

- ⚡ **App Router (Next.js 14)** for scalable route-based architecture
- 🎯 **Role-based dashboard** for Admins, Teachers & Students
- 📚 **AI Assistant** for document summarization, quiz generation, etc.
- 📝 **To-do and Daily Planner** management
- 🧠 **Smart PDF & PPTX parsing** (via backend)
- 🌐 **Notion & Google Calendar** integrations
- 🔐 **JWT-based authentication** (frontend logic)
- 🎨 **TailwindCSS** for fast and responsive UI

---

## 🔗 Backend Repository

👉 [**Daksh Backend**](https://github.com/your-repo/backend-daksh)

---

## 🧪 Tech Stack

- **Next.js 14 (App Directory)**
- **React 18**
- **TailwindCSS**
- **TypeScript**
- **Cloudinary** (file uploads)
- **Prisma + PostgreSQL** (on backend)
- **JWT Authentication**

---

## 🛡️ Security & Best Practices

- 🔒 Uses `middleware.ts` for route protection
- ✅ Secure API calls using tokens stored via `httpOnly` cookies
- 📄 Environment variables are stored securely in `.env.local`

---

## 📬 Contact

- **Author**: Angad Sudan  
- **Frontend Repo**: [Daksh Frontend](https://github.com/AngadSudan/daksh-saas-frontend)  
- **LinkedIn**: [linkedin.com/in/AngadSudan](https://linkedin.com/in/AngadSudan)  
- **Email**: angadsudan453@example.com

---
