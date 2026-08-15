import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../components/ui/Dialog';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import toast from 'react-hot-toast';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '../usersApi';

const EMPTY_VALUES = {
  name: '',
  email: '',
  role: 'member',
};


export default function UserFormPopup({ open, onClose, editingUser }) {
  const isEditMode = Boolean(editingUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({ defaultValues: EMPTY_VALUES });

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const isSubmitting = isCreating || isUpdating;

  useEffect(() => {
    if (!open) return;
    reset(
      isEditMode
        ? { name: editingUser.name, email: editingUser.email, role: editingUser.role }
        : EMPTY_VALUES
    );
  }, [open, isEditMode, editingUser, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        const res = await updateUser({ id: editingUser.id, ...data }).unwrap();
        toast.success(res.message);
      } else {
        const res = await createUser(data).unwrap();
        toast.success(res.message);
      }
      onClose();
    } catch (err) {
      toast.error(err?.data?.message)
      setError('root', {
        message: err?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isEditMode ? 'Edit user' : 'Create user'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errors.root && (
          <p className="text-sm text-red-600">{errors.root.message}</p>
        )}

        <Input
          label="Name"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />

        <Input
          label="Email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message}
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Role
          </label>
          <select
            {...register('role', { required: true })}
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {!isEditMode && (
          <p className="text-xs text-slate-500">
            The account will be created with the default password
            configured on the backend. The user should change it on
            first login.
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditMode ? 'Save changes' : 'Create user'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
