import './App.css';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const getNavLinkClass = ({ isActive }) =>
    `nav-link${isActive ? ' active fw-semibold text-white' : ''}`;

  return (
    <div className="app-shell min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark app-nav">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/activities">
            <img
              src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
              alt="OctoFit logo"
              className="app-logo"
            />
            <span className="fs-4 fw-semibold">OctoFit Tracker</span>
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/activities">
                Activities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/leaderboard">
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/teams">
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/users">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/workouts">
                Workouts
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
