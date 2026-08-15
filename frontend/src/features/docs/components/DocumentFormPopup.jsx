import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../components/ui/Dialog';
import Input from '../../../components/ui/Input';
import FileInput from '../../../components/ui/FileInput';
import Button from '../../../components/ui/Button';
import { useUploadDocumentMutation } from '../documentsApi';
import toast from 'react-hot-toast';

const ACCEPTED_TYPES = '.pdf,.doc,.docx,.txt';
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB — matches Laravel's max:10240 rule

export default function DocumentFormPopup({ open, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({ defaultValues: { title: '', document: null } });

  const [uploadDocument, { isLoading }] = useUploadDocumentMutation();

  // Upload is create-only (no edit mode), so just reset to blank
  // every time the dialog opens.
  useEffect(() => {
    if (open) reset({ title: '', document: null });
  }, [open, reset]);

  const onSubmit = async (data) => {
    const file = data.document?.[0];
    if (!file) {
      setError('document', { message: 'Please choose a file to upload' });
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError('document', { message: 'File must be 10MB or smaller' });
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('document', file);

    try {
      const res=await uploadDocument(formData).unwrap();
      toast.success(res.message)
      onClose();
    } catch (err) {
      toast.error(err?.data?.message)
      setError('root', {
        message: err?.message || 'Upload failed. Please try again.',
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="Upload document">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errors.root && (
          <p className="text-sm text-red-600">{errors.root.message}</p>
        )}

        <Input
          label="Title"
          {...register('title', { required: 'Title is required' })}
          error={errors.title?.message}
        />

        <FileInput
          label="File (PDF, DOC, DOCX, TXT — max 10MB)"
          accept={ACCEPTED_TYPES}
          {...register('document', { required: 'Please choose a file' })}
          error={errors.document?.message}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
