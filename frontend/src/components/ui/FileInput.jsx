import { forwardRef } from 'react';

/**
 * Native file input wired for React Hook Form via register().
 * RHF's register on a file input gives you a FileList in field.value —
 * grab the first file in the form's onSubmit (see DocumentFormDialog).
 */
const FileInput = forwardRef(function FileInput(
  { label, error, accept, ...props },
  ref
) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
});

export default FileInput;
