import Table from '../../../components/ui/Table';
import Button from '../../../components/ui/Button';

export default function UserTable({ users, onEdit, onDeleteRequest }) {
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      render: (row) => (
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
            row.role === 'admin'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-slate-100 text-slate-700'
          }`}
        >
          {row.role}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      
      render: (row) => (
        <div className="flex gap-2 w-full justify-end">
          <Button variant="ghost" onClick={() => onEdit(row)} className='bg-blue-400 text-white'>
            Edit
          </Button>
          <Button variant="ghost" onClick={() => onDeleteRequest(row.id)} className='bg-red-400 text-white'>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rows={users}
      emptyMessage="No users yet. Create the first account."
    />
  );
}
