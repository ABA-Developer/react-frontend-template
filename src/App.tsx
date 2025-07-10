import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";

// Importing pages
import Login from "./pages/AuthPages/Login";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/SystemPages/UserProfiles";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import Menu from "./pages/SystemPages/Menu";
import UserAccount from "./pages/SystemPages/UserAccount";
import Roles from "./pages/SystemPages/Roles";
import PageMeta from "./components/common/PageMeta";

export default function App() {
  return (
    <>
      <PageMeta
        title="ABA React Dashboard"
        description="Abarobotics React.js Dashboard page powered by TailAdmin"
      />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path='/' element={<Home />} />
            <Route path='/blank' element={<Blank />} />

            {/* Pengaturan Menu */}
            <Route path='/settings/menu' element={<Menu />} />
            <Route path='/settings/role' element={<Roles />} />
            <Route path='/settings/user-account' element={<UserAccount />} />
            <Route path='/settings/profile' element={<UserProfiles />} />
          </Route>

          {/* Auth Layout */}
          <Route path='/login' element={<Login />} />

          {/* Fallback Route */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
