import React from 'react';
import { CircleIcon, CheckCircle2Icon } from '../../../components/ui/icons';
import type { PasswordCriteriaProps } from '../types';

export const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({
  hasMinLength,
  hasLetterAndNumber,
  className = '',
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-1 text-xs select-none ${className}`}
    >
      {/* Tiêu chí 1: Tối thiểu 8 ký tự */}
      <div
        className={`flex items-center gap-1.5 transition-colors duration-200 ${
          hasMinLength ? 'text-[#10B981] font-medium' : 'text-[#6E7DB4]'
        }`}
      >
        {hasMinLength ? (
          <CheckCircle2Icon className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
        ) : (
          <CircleIcon className="w-3.5 h-3.5 text-[#9FA8CD] shrink-0" />
        )}
        <span>Tối thiểu 8 ký tự</span>
      </div>

      {/* Tiêu chí 2: Bao gồm chữ cái và số */}
      <div
        className={`flex items-center gap-1.5 transition-colors duration-200 ${
          hasLetterAndNumber ? 'text-[#10B981] font-medium' : 'text-[#6E7DB4]'
        }`}
      >
        {hasLetterAndNumber ? (
          <CheckCircle2Icon className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
        ) : (
          <CircleIcon className="w-3.5 h-3.5 text-[#9FA8CD] shrink-0" />
        )}
        <span>Gồm chữ cái và số</span>
      </div>
    </div>
  );
};

export default PasswordCriteria;
