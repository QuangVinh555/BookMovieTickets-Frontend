import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Default from "./layout/Default/Default";
import AdminLayout from "./layout/Admin/Admin";
import Sidebar from "./layout/Sidebar/Sidebar";
import Dashboard from "./components/admin/dashboard/Dashboard";
import User from "./components/admin/user/User";
import MovieTheater from "./components/admin/movietheater/MovieTheater";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Default Layout */}
          {/* <Route path="/" element={<Default />}></Route> */}

          {/* Sidebar Layout */}
          {/* <Route path="/" element={<Sidebar />}></Route> */}

          {/* Admin Layout */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<User />} />
            <Route path="/movietheater" element={<MovieTheater />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
