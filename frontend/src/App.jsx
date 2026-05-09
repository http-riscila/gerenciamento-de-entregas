import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Users from './pages/Users';
import Recipients from './pages/Recipients';
import Deliveries from './pages/Deliveries';
import DeliveryHistory from './pages/DeliveryHistory';
import './App.css';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />

          <Route path="/home" element={<PrivateRoute rolesAllowed={['ADMIN', 'LOGISTICS', 'DRIVER']}><Home /></PrivateRoute>} />
          <Route path="/entregas" element={<PrivateRoute rolesAllowed={['ADMIN', 'LOGISTICS', 'DRIVER']}><Deliveries /></PrivateRoute>} />
          <Route path="/usuários" element={
              <PrivateRoute rolesAllowed={['ADMIN']}>
                <Users />
              </PrivateRoute>
          } />
          <Route path="/destinatários" element={
            <PrivateRoute rolesAllowed={['ADMIN', 'LOGISTICS']}>
              <Recipients />
            </PrivateRoute>
          } />
          <Route path="/entregas/:id/historico" element={<PrivateRoute rolesAllowed={['ADMIN', 'LOGISTICS', 'DRIVER']}><DeliveryHistory /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}