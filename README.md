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
- TypeScript + React + Vite
- Tailwind CSS
- 状态管理：待添加

### Backend
- Python + FastAPI
- Poetry 包管理
- 数据库：待添加

## Getting Started

### Prerequisites
- Node.js >= 16
- Python >= 3.9
- pnpm
- Poetry

### Development
1. Clone the repository
2. Setup frontend:
   ```bash
   cd frontend
   pnpm install
   ```
3. Configure environment variables:
   Copy `.env.example` to `.env` and fill in:
   ```env
   VITE_WECHAT_APP_ID=你的公众号AppID
   VITE_REDIRECT_URI=你的回调域名/auth/callback
   ```
4. Start development server:
   ```bash
   pnpm dev
   ```
5. Setup backend:
   ```bash
   cd backend
   poetry install
   ```
6. Configure environment variables:
   Copy `.env.example` to `.env` and fill in:
   ```env
   WECHAT_APP_ID=你的公众号AppID
   WECHAT_APP_SECRET=你的公众号AppSecret
   ```
7. Start development server:
   ```bash
   poetry run uvicorn main:app --reload
   ```

## WeChat Configuration

### Development Environment Configuration
1. Install localtunnel:
   ```bash
   npm install -g localtunnel
   ```
2. Create public address:
   ```bash
   lt --port 5173 --subdomain your-subdomain
   ```
3. WeChat Public Platform Configuration:
   - Log in to [WeChat Public Platform](https://mp.weixin.qq.com)
   - Enter "Settings & Development" -> "Public Account Settings" -> "Function Settings"
   - Add web authorization domain name (e.g. loca.lt)

### Production Environment Configuration
1. Domain name requirements:
   - Must use a registered domain name
   - Must use HTTPS
2. WeChat Public Platform Configuration:
   - Configure web authorization domain name
   - Configure JS interface security domain name (if necessary)

## API Documentation

### Backend API
- Login interface: `POST /api/v1/wechat/login`
  - Request body: `{ code: string }`
  - Response: User information

## Best Practices

### Development Environment
- Use localtunnel for local development and testing
- Use environment variables to manage configuration
- Follow TypeScript type definitions

### Security
- Do not hardcode AppSecret in code
- Use HTTPS
- Implement CSRF protection
- Use secure session management

## Features
- WeChat OAuth2 login
- User session management
- Secure token handling

## FAQ
1. "Something went wrong" error
   - Cause: Using an unsupported callback domain name (e.g. localhost)
   - Solution: Use localtunnel to get a public domain name

2. Authorization failure
   - Check AppID configuration
   - Check callback domain name configuration
   - Ensure access within WeChat

## Todo List
- [ ] Add state management
- [ ] Implement user information persistence
- [ ] Add unit tests
- [ ] Add error handling middleware
- [ ] Implement automated deployment
