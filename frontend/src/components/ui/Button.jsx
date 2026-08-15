export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const base = 'px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-700',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-slate-600 hover:bg-slate-100',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
