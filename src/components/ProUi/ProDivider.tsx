import React from 'react'

interface DividerProps {
    text?: string
    orientation?: 'horizontal' | 'vertical'
    className?: string
}

const ProDivider: React.FC<DividerProps> = ({
    text,
    orientation = 'horizontal',
    className = '',
}) => {
    if (orientation === 'vertical') {
        return (
            <div className={`flex items-center ${className}`}>
                <div className="h-full border-l border-gray-300"></div>
                {text && (
                    <span className="mx-2 text-sm text-gray-500 whitespace-nowrap">
                        {text}
                    </span>
                )}
                <div className="h-full border-l border-gray-300"></div>
            </div>
        )
    }

    return (
        <div className={`flex items-center ${className}`}>
            <div className="flex-grow border-t border-gray-300"></div>
            {text && (
                <span className="flex-shrink mx-4 text-sm text-gray-500">
                    {text}
                </span>
            )}
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
    )
}

export default ProDivider