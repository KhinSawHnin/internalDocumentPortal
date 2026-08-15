import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, error, ...props }, ref) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 ${
          error ? 'border-red-400' : 'border-slate-300'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
});

export default Input;
