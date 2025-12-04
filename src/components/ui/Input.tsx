import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                <label className="block text-sm font-medium text-silver mb-1">
                    {label}
                </label>
                <input
                    ref={ref}
                    className={`
                        w-full px-4 py-2 bg-black/20 border rounded-lg 
                        text-white placeholder-gray-500
                        focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold
                        transition-all duration-200
                        ${error ? 'border-ruby' : 'border-white/10'}
                        ${className}
                    `}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs text-ruby">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
