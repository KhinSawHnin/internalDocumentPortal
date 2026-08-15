import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../features/auth/authSlice';
import { ROUTES } from './routes';


export default function AdminRoute() {
  const isAdmin = useSelector(selectIsAdmin);

  if (!isAdmin) {
    return <Navigate to={ROUTES.DOCUMENTS} replace />;
  }

  return <Outlet />;
}
