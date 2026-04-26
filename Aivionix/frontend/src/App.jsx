import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔐 Auth Protection
import ProtectedRoute from "./component/pages/protectedRoute.jsx";

// 🧭 Layout
import Sidebar from "./component/pages/sidebar.jsx";

// 🌐 Public Pages
import About from "./component/pages/aboutus.jsx";
import Login from "./component/pages/login.jsx";
import Signup from "./component/pages/signup.jsx";
import Terms from "./component/pages/terms.jsx";
import UserGuide from "./component/pages/userguide.jsx";

// 🔥 App Pages (Protected)
import Chatbot from "./chatbot.jsx";
import Settings from "./component/pages/settings.jsx";
import History from "./component/pages/history.jsx";

// 🏠 Home Landing Page
import Home from "./component/pages/home.jsx";

// 🧠 Protected Layout (Sidebar + Page)
const AppLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>

        {/* 🌐 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/userguide" element={<UserGuide />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 PROTECTED ROUTES */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Chatbot />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Settings />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <AppLayout>
                <History />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* ❌ FALLBACK */}
        <Route path="*" element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App;