import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../../features/auth/authSlice';
import { ROUTES } from '../../router/routes';

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded-md text-sm font-medium ${
    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
  }`;

export default function Sidebar() {
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <aside className="w-56 shrink-0 border-r border-slate-200 bg-white p-4 space-y-1">
      <NavLink to={ROUTES.DOCUMENTS} className={linkClass}>
        Documents
      </NavLink>

      {/* Admin-only nav item — mirrors the AdminRoute guard on the route itself */}
      {isAdmin && (
        <NavLink to={ROUTES.USERS} className={linkClass}>
          Users
        </NavLink>
      )}
    </aside>
  );
}
