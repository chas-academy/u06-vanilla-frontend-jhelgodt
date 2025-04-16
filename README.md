# U06 - TypeScript Frontend for Book API

This is a small frontend application built with TypeScript and Vite, designed to connect to a previously created REST API for managing books. The user can perform full CRUD operations through a responsive UI.

## 🚀 Live Demo

Open the deployed app on Netlify:  
https://67fe360a74f67e39ab935c67--dainty-gumption-91dd9f.netlify.app/

## 🖌️ Figma Design Document

View the wireframe and layout plan on Figma:  
https://www.figma.com/board/MGzDBoDm4IqdWw59yjBebu/Wireframe--U06-?node-id=1-2&t=dGnFAi4yjCVqP1FU-1

## 🛠 Tech Stack

- TypeScript
- Vite
- HTML + CSS
- REST API (from U05)
- Deployed via Netlify

## 📚 Functionality

The app allows users to:

- View all books (GET all)
- Add a new book (POST)
- Edit an existing book (PUT)
- Delete a book (DELETE)
- Responsive design for both desktop and iPhone 13 screens

## 🔌 API

This frontend connects to the following API:  
https://u05-typescript.onrender.com/api/v1/books

Make sure your backend is deployed and working properly for full functionality.

## 📦 Installation

1. Clone the repo:  
   git clone https://github.com/YOUR-USERNAME/u06-frontend.git  
   cd u06-frontend

2. Install dependencies:  
   npm install

3. Start the development server:  
   npm run dev

## 📱 Responsive Design

The UI is fully responsive and optimized for both desktop and mobile use (e.g., iPhone 13 screen sizes). The layout adapts based on screen width using media queries.

## 🧪 Deployment Notes

Netlify auto-detects the Vite project structure.  
If needed, you can specify this config in a netlify.toml file:

[build]  
command = "npm run build"  
publish = "dist"
