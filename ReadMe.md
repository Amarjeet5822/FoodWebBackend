# Food Web Application

This is a **full-stack food web application** that allows users to authenticate using Google OAuth, manage sessions, and perform CRUD operations.

## 🏗️ Project Structure

- **Backend**: Node.js with Express.js
- **Frontend**: React with Vite
- **Database**: MongoDB with Mongoose
- **Authentication**: Google OAuth using Passport.js
- **Session Management**: Express-session with JWT for secure token handling
- **Styling**: Tailwind CSS

## 📁 Folder Structure

### Backend
```
foodwebbackend/
├── config/
│   ├── dbConnect.mjs
│   └── passport.mjs
├── controllers/
│   ├──authController.mjs
│   └──getRecipesController.mjs
│   └──recipeController.mjs
│   └──userPreferenceController.mjs
├── middlewares
│   └──authMiddleware.mjs
│   └──LoginMiddleware.mjs
│   └──searchMiddleware.mjs
│   ├──SignupMiddleware.mjs
│   └──userIsAuthenticated.mjs
│   └──userPreferenceMiddleware.mjs
├── models/
│   └── userModel.mjs
│   └── userPreferenceModel.mjs
├── routes/
│   └── indexRoutes.mjs
│   └── authRoute.mjs
│   └── recipeRoutes.mjs
├── utils/
│   └── AppError.mjs
├── .env
├── package.json
├── server.mjs
```

### Frontend
```
foodwebfrontend/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.js
```

## 🚀 Installation and Setup

### Backend Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Amarjeet5822/FoodWebBackend
   cd FoodWebBackend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env` file:**
   ```plaintext
   PORT=8082
   NODE_ENV=development
   SESSION_SECRET=your_session_secret
   SECRET_KEY=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   FE_URL=http://localhost:5173
   DEPLOY_FE_URL=https://your-deployed-frontend-url.com
   BE_URL_DEPLOY=https://your-deployed-backend-url.com
   ```
4. **Run the backend server:**
   ```bash
   npm run server
   ```

### Frontend Setup

1. **Navigate to the frontend folder:**
   ```bash
   cd ../foodwebfrontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env` file:**
   ```plaintext
   VITE_BACKEND_URL=http://localhost:8082
   ```
4. **Run the frontend server:**
   ```bash
   npm run server
   ```

## 📦 Features

### Backend
- Google OAuth authentication
- JWT token-based authentication
- Session management with express-session
- Secure cookie handling
- API routes for login, logout, and authentication status

### Frontend
- Google login integration
- Tailwind CSS for styling
- React Router for page navigation
- Axios for API requests

## 📡 API Endpoints

### Authentication Routes
- **GET** `/auth/google`: Initiates Google OAuth login
- **GET** `/auth/google/callback`: Google OAuth callback route
- **GET** `/api/auth/status`: Checks user authentication status
- **POST** `/logout`: Logs out the user

## 📚 Dependencies

### Backend
- express
- mongoose
- passport
- passport-google-oauth20
- express-session
- jwt
- dotenv
- cookie-parser

### Frontend
- react
- react-dom
- react-router-dom
- axios
- tailwindcss
- vite

## 🏁 Deployment

The app is ready for deployment with Render for the backend and Vercel/Netlify for the frontend.

## 📧 Contact

For any queries or issues, please contact [amar.bst5822@gmail.com](mailto:amar.bst5822@gmail.com).

---

Happy coding! ✨

