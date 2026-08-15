import Table from '../../../components/ui/Table';
import Button from '../../../components/ui/Button';

function formatFileSize(bytes) {
  if (!bytes) return '—';
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export default function DocumentTable({ documents, currentUserId, onDeleteRequest,handleDownload }) {
  const columns = [
    { key: 'title', header: 'Title' },
    { key: 'file_name', header: 'File' },
    {
      key: 'file_size',
      header: 'Size',
      render: (row) => formatFileSize(row.file_size),
    },
    {
      key: 'owner',
      header: 'Uploaded by',
      render: (row) => row.user?.name ?? documents.user.name,
    },
    {
      key: 'actions',
      header: '',
      render: (row) => {
       
        const isOwner = row.user_id === currentUserId ;
        
        
        return (
          <div className="flex justify-end gap-4">
             <Button variant="secondary" onClick={() => handleDownload(row)}>
          Download
        </Button>
            <Button variant="ghost"  disabled={!isOwner} className={`bg-red-400 text-white ${!isOwner ? 'cursor-not-allowed opacity-50' : ''}`}onClick={() => onDeleteRequest(row.id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      rows={documents}
      emptyMessage="No documents uploaded yet."
    />
  );
}
