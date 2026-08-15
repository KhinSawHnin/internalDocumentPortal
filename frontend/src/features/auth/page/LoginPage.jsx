import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../authApi';
import { setCredentials } from '../authSlice';
import { ROUTES } from '../../../router/routes';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ defaultValues: { email: '', password: '' } });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  const redirectTo = location.state?.from?.pathname || ROUTES.DOCUMENTS;
const onSubmit = async (data) => {
  try {
    const result = await login(data).unwrap();
    dispatch(setCredentials({
      token: result.access_token,
      user: result.user,
    }));
    navigate(redirectTo, { replace: true });
    toast.success(result.message)
  } catch (err) {
    toast.error(err?.data?.message)
    setError('root', {
      message:
        err?.message || 'Invalid credentials. Please try again.',
    });
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow space-y-4"
      >
        <h1 className="text-xl font-semibold text-slate-900">
          Internal Document Portal
        </h1>

        {errors.root && (
          <p className="text-sm text-red-600">{errors.root.message}</p>
        )}

        <div>
          <Input
            label="Email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}
