import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, role }) {
  const { user, booting } = useAuth();

  if (booting) {
    return (
      <div className="container-shell py-24">
        <div className="card-panel mx-auto max-w-xl text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-pulse-glow rounded-full bg-cyan-100" />
          <h2 className="text-2xl font-semibold text-slate-950">Loading your workspace...</h2>
          <p className="mt-3 text-slate-600">Checking your secure session and preparing the dashboard.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
