import { BrowserRouter as Router, Routes, Route } from "react-router";

// Importing pages
import Login from "./pages/AuthPages/Login";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path='/' element={<Home />} />

            <Route path='/settings/profile' element={<UserProfiles />} />
            <Route path='/blank' element={<Blank />} />
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
