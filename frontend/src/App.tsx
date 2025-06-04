import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./pages/Home";
import Login from "./pages/users/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import NavBar from "./includes/NavBar";
import ListeChantiers from "./pages/chantiers/ListeChantiers";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <Header />
          <NavBar />
          <main className="main-layout">
            <aside className="sidebar">
              <Login />
            </aside>
            <section className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/chantiers" element={<ListeChantiers />} />
              </Routes>
            </section>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
