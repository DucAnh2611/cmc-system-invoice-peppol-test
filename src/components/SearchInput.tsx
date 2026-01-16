import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { useDebounce } from '../hooks/useDebounce';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  useDebounce?: number;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  className,
  inputClassName,
  useDebounce: debounceDelay,
}: SearchInputProps) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, debounceDelay ?? 0);
  const lastEmittedValue = useRef(value);

  useEffect(() => {
    setLocalValue(value);
    lastEmittedValue.current = value;
  }, [value]);

  useEffect(() => {
    if (debounceDelay && debouncedValue !== lastEmittedValue.current) {
      lastEmittedValue.current = debouncedValue;
      onChange(debouncedValue);
    }
  }, [debouncedValue, debounceDelay, onChange]);

  const changeDebouncedValue = (newValue: string) => {
    setLocalValue(newValue);

    if (!debounceDelay) {
      onChange(newValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    changeDebouncedValue(newValue);
  };

  const handleClear = () => {
    changeDebouncedValue('');
  };

  return (
    <div className={cn('w-fit relative bg-white', className)}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        <Search size={16} className="text-gray-500" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          'w-[300px] px-4 py-2 rounded-md border border-gray-300',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm',
          localValue ? 'pl-10 pr-10' : 'pl-10',
          inputClassName
        )}
        value={localValue}
        onChange={handleChange}
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
