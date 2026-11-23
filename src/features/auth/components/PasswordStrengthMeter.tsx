import React, { useMemo } from 'react';

import { NUMBER_REGEX, SPECIAL_CHAR_REGEX } from '@/utils';

import { CheckCircle2Icon, CircleIcon } from '@/components/ui/icons';

import type { PasswordStrengthMeterProps } from '../types';

const STRENGTH_CONFIG = [
  { label: 'Chưa nhập', textClass: 'text-text-muted', barClass: 'bg-surface-accent' },
  { label: 'Yếu', textClass: 'text-danger', barClass: 'bg-danger' },
  { label: 'Trung bình', textClass: 'text-warning', barClass: 'bg-warning' },
  { label: 'Khá', textClass: 'text-brand-400', barClass: 'bg-brand-400' },
  { label: 'Mạnh', textClass: 'text-secondary-500', barClass: 'bg-secondary-500' },
] as const;

export function usePasswordStrength(
  password: string,
  hasMinLength: boolean,
  hasNumberOrSpecial: boolean
) {
  return useMemo(() => {
    if (!password) return STRENGTH_CONFIG[0];
    let score = 0;
    if (hasMinLength) score += 1;
    if (hasNumberOrSpecial) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (
      password.length >= 12 ||
      (NUMBER_REGEX.test(password) && SPECIAL_CHAR_REGEX.test(password))
    ) {
      score += 1;
    }
    const clampedScore = Math.max(1, Math.min(4, score));
    return STRENGTH_CONFIG[clampedScore];
  }, [password, hasMinLength, hasNumberOrSpecial]);
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  hasMinLength,
  hasNumberOrSpecial,
}) => {
  const strength = usePasswordStrength(password, hasMinLength, hasNumberOrSpecial);
  const strengthLevel = STRENGTH_CONFIG.indexOf(strength);

  return (
    <>
      <div className="grid grid-cols-4 gap-1.5 mt-2.5" aria-hidden="true">
        {[1, 2, 3, 4].map((segment) => (
          <div
            key={segment}
            className={`h-1 rounded-pill transition-colors duration-200 ${
              strengthLevel >= segment ? strength.barClass : 'bg-surface-accent'
            }`}
          />
        ))}
      </div>

      <div className="mt-3 p-3.5 rounded-sm bg-brand-50/70 border border-brand-100/80 flex flex-col gap-2 text-xs select-none">
        <div
          className={`flex items-center gap-2 transition-colors duration-200 ${
            hasMinLength ? 'text-secondary-500 font-medium' : 'text-text-muted'
          }`}
        >
          {hasMinLength ? (
            <CheckCircle2Icon className="w-3.5 h-3.5 text-secondary-500 shrink-0" />
          ) : (
            <CircleIcon className="w-3.5 h-3.5 text-text-disabled shrink-0" />
          )}
          <span>Tối thiểu 8 ký tự (không tính khoảng trắng thừa)</span>
        </div>

        <div
          className={`flex items-center gap-2 transition-colors duration-200 ${
            hasNumberOrSpecial ? 'text-secondary-500 font-medium' : 'text-text-muted'
          }`}
        >
          {hasNumberOrSpecial ? (
            <CheckCircle2Icon className="w-3.5 h-3.5 text-secondary-500 shrink-0" />
          ) : (
            <CircleIcon className="w-3.5 h-3.5 text-text-disabled shrink-0" />
          )}
          <span>Chứa ít nhất một chữ số (0-9) hoặc ký tự đặc biệt (@, #, $, ...)</span>
        </div>
      </div>
    </>
  );
};

export default PasswordStrengthMeter;
