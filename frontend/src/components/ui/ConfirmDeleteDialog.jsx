import Dialog from './Dialog';
import Button from './Button';

export default function ConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
  title = 'Delete this item?',
  description = 'This action cannot be undone.',
  isLoading = false,
}) {
  return (
    <Dialog open={open} onClose={onClose} title={title}>
      <p className="text-sm text-slate-600 mb-6">{description}</p>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Dialog>
  );
}
