import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectCurrentUser } from '../../features/auth/authSlice';
import { useLogoutApiMutation } from '../../features/auth/authApi';
import { ROUTES } from '../../router/routes';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

export default function Topbar() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutApiMutation();

  const handleLogout = async () => {
    try {
      const res = await logoutApi().unwrap();
      toast.success(res.message)
    } catch {
     
    } finally {
      dispatch(logout());
      navigate(ROUTES.LOGIN, { replace: true });
    }
  };

  return (
    <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6">
      <span className="font-semibold text-slate-900">
        Internal Document Portal
      </span>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          {user?.name} <span className="text-slate-400">({user?.role})</span>
        </span>
        <Button variant="ghost" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </header>
  );
}
