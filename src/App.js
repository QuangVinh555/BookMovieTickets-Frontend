import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Default from "./layout/Default/Default";
import AdminLayout from "./layout/Admin/Admin";
// import Sidebar from "./layout/Sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import User from "./pages/user/User";
import MovieTheater from "./pages/movietheater/MovieTheater";
import Movie from "./pages/movie/Movie";
import ShowTime from "./pages/showtime/ShowTime";
import Ticket from "./pages/ticket/Ticket";
import New from "./pages/new/New";

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
            <Route path="/movies" element={<Movie />} />
            <Route path="/showtimes" element={<ShowTime />} />
            <Route path="/tickets" element={<Ticket />} />
            <Route path="/news" element={<New />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
