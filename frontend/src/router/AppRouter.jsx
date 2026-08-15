import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import { ROUTES } from './routes';
import AppLayout from '../components/layout/AppLayout';
import LoginPage from '../features/auth/page/LoginPage';
import UsersPage from '../features/user/pages/UsersPage';
import DocumentsPage from '../features/docs/pages/DocumentPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

    
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path={ROUTES.DOCUMENTS} element={<DocumentsPage />} />

            
            <Route element={<AdminRoute />}>
              <Route path={ROUTES.USERS} element={<UsersPage />} />
            </Route>
          </Route>
        </Route>

        <Route
          path={ROUTES.ROOT}
          element={<Navigate to={ROUTES.DOCUMENTS} replace />}
        />
        <Route
          path="*"
          element={<Navigate to={ROUTES.DOCUMENTS} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
