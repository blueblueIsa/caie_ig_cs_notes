import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register }from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
// import { Course } from '../pages/Course';
// import { Profile } from '../pages/Profile';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="course/:id" element={<Course />} /> */}
          {/* <Route path="profile" element={<Profile />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}