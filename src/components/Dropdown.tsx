import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  title?: string;
  options: DropdownOption[];
  selected?: string;
  onSelectionChange?: (selection: DropdownOption) => void;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
}

export const Dropdown = ({
  title,
  options,
  selected,
  onSelectionChange,
  onOpen,
  onClose,
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState<number | undefined>(undefined);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClose]);

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const handleSelect = (option: DropdownOption) => {
    onSelectionChange?.(option);
    handleClose();
  };

  const selectedOption = useMemo(() => {
    return selected ? options.find(opt => opt.value === selected) : undefined;
  }, [selected, options]);

  useEffect(() => {
    if (!isOpen || !measureRef.current) return;

    let maxOptionWidth = 0;

    const measureText = (text: string): number => {
      measureRef.current!.textContent = text;
      return measureRef.current!.offsetWidth;
    };

    options.forEach(option => {
      const optionWidth = measureText(option.label);
      maxOptionWidth = Math.max(maxOptionWidth, optionWidth);
    });

    setDropdownWidth(maxOptionWidth + 32);
  }, [isOpen, options]);

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <span
        ref={measureRef}
        className="absolute invisible whitespace-nowrap text-sm px-4 py-2"
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          'w-full flex items-center justify-between gap-2 px-4 py-2',
          'bg-white border border-gray-300 rounded-md',
          'hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          'transition-colors whitespace-nowrap'
        )}
      >
        <span className="text-sm text-gray-700 truncate whitespace-nowrap">
          {selectedOption ? selectedOption.label : title || 'Select an option'}
        </span>
        <ChevronDown
          size={16}
          className={cn('text-gray-500 shrink-0 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownMenuRef}
          className={cn(
            'absolute z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg',
            'max-h-60 overflow-auto'
          )}
          style={{ width: dropdownWidth ? `${dropdownWidth}px` : undefined }}
        >
          <ul className="py-1">
            {options.map(option => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={cn(
                    'w-full text-left px-4 py-2 text-sm text-gray-700',
                    'hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
                    'transition-colors whitespace-nowrap',
                    selected === option.value && 'bg-blue-50 text-blue-700'
                  )}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
