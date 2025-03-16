import React, { useId, forwardRef } from 'react';

function Select({ options, label, className = '', ...props }, ref) {
    const id = useId();
    
    // Properly defining className instead of reassigning
    const selectClassName = `px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`;

    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
            <select 
                {...props}
                id={id}
                ref={ref}
                className={selectClassName}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

// Correctly using forwardRef
export default forwardRef(Select);
