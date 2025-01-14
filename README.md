# WeChat Login System

A full-stack WeChat login implementation with React frontend and FastAPI backend.

## Project Structure

```
wechat-login/
├── frontend/          # React + TypeScript frontend
└── backend/           # FastAPI backend
```

## Tech Stack

### Frontend
- TypeScript
- React
- Vite
- Tailwind CSS
- shadcn/ui

### Backend
- Python
- FastAPI
- Poetry
- Pydantic

## Getting Started

### Prerequisites
- Node.js >= 16
- Python >= 3.8
- Poetry
- pnpm

### Development
1. Clone the repository
2. Setup frontend:
   ```bash
   cd frontend
   pnpm install
   pnpm dev
   ```
3. Setup backend:
   ```bash
   cd backend
   poetry install
   poetry run uvicorn main:app --reload
   ```

## Features
- WeChat OAuth2 login
- User session management
- Secure token handling
