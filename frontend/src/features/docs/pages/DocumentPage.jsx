import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import { useDisclosure } from '../../../hooks/useDisclosure';
import {
  useGetDocumentsQuery,
  useDeleteDocumentMutation,
  
} from '../documentsApi';
import DocumentTable from '../components/DocumentTable';
import DocumentFormPopup from '../components/DocumentFormPopup';
import ConfirmDeleteDialog from '../../../components/ui/ConfirmDeleteDialog';
import Button from '../../../components/ui/Button';
import toast from 'react-hot-toast';
import { useLazyDownloadDocumentQuery } from '../documentsApi';

export default function DocumentsPage() {
  const currentUser = useSelector(selectCurrentUser);
  const { data: documents = [], isLoading, isError } = useGetDocumentsQuery();
  const [deleteDocument, { isLoading: isDeleting }] = useDeleteDocumentMutation();
  const [triggerDownload] = useLazyDownloadDocumentQuery();
  const uploadDialog = useDisclosure();
  const deleteDialog = useDisclosure(); 

  const handleConfirmDelete = async () => {
    try {
     const res= await deleteDocument(deleteDialog.context).unwrap();
      toast.success(res.message)
      deleteDialog.close();
    } catch(err) {
      toast.error(err.message)
    }
  };
   const handleDownload = async (row) => {
    try {
      const blob = await triggerDownload(row.id).unwrap();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = row.file_name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error('Failed to download document.');
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900">Documents</h1>
        <Button onClick={() => uploadDialog.open()}>Upload document</Button>
      </div>

      {isLoading && (
        <p className="text-sm text-slate-500">Loading documents...</p>
      )}
      {isError && (
        <p className="text-sm text-red-600">Failed to load documents.</p>
      )}

      {!isLoading && !isError && (
        <DocumentTable
          documents={documents}
          currentUserId={currentUser?.id}
          onDeleteRequest={(id) => deleteDialog.open(id)}
          handleDownload={handleDownload}
        />
      )}

      <DocumentFormPopup open={uploadDialog.isOpen} onClose={uploadDialog.close} />

      <ConfirmDeleteDialog
        open={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete this document?"
        description="This will permanently remove the file. This action cannot be undone."
      />
    </div>
  );
}
