import { useDisclosure } from '../../../hooks/useDisclosure';
import { useGetUsersQuery, useDeleteUserMutation } from '../usersApi';
import UserTable from '../components/UserTable';
import UserFormPopup from '../components/UserFormPopup';
import ConfirmDeleteDialog from '../../../components/ui/ConfirmDeleteDialog';
import Button from '../../../components/ui/Button';
import toast from 'react-hot-toast';

export default function UsersPage() {
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const formDialog = useDisclosure(); 
  const deleteDialog = useDisclosure(); 

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteUser(deleteDialog.context).unwrap();
      toast.success(res.message)
      deleteDialog.close();
    } catch (err){
     toast.error(err.message)
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900">Users</h1>
        <Button onClick={() => formDialog.open(null)}>Create user</Button>
      </div>

      {isLoading && <p className="text-sm text-slate-500">Loading users...</p>}
      {isError && (
        <p className="text-sm text-red-600">Failed to load users.</p>
      )}

      {!isLoading && !isError && (
        <UserTable
          users={users}
          onEdit={(user) => formDialog.open(user)}
          onDeleteRequest={(id) => deleteDialog.open(id)}
        />
      )}

      <UserFormPopup
        open={formDialog.isOpen}
        onClose={formDialog.close}
        editingUser={formDialog.context}
      />

      <ConfirmDeleteDialog
        open={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete this user?"
        description="This will permanently remove their account. This action cannot be undone."
      />
    </div>
  );
}
