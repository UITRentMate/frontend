import React from 'react';
import { ArrowLeft, Send } from 'lucide-react';

interface ActionCardProps {
  isConfirmed: boolean;
  onConfirmChange: (confirmed: boolean) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  isConfirmed,
  onConfirmChange,
  onSubmit,
  onBack,
  isSubmitting = false,
}) => {
  return (
    <article className="w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
      {/* Checkbox confirmation */}
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={isConfirmed}
          onChange={(e) => onConfirmChange(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded text-blue-700 border-slate-300 focus:ring-blue-600 cursor-pointer"
        />
        <span className="text-sm text-slate-800 leading-snug">
          Tôi đã kiểm tra thông tin phòng trọ và xác nhận thông tin gửi yêu cầu là chính xác.
        </span>
      </label>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-6 h-12 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại chi tiết phòng</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!isConfirmed || isSubmitting}
          className={`w-full sm:flex-1 h-12 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
            isConfirmed && !isSubmitting
              ? 'bg-blue-700 hover:bg-blue-800 shadow-blue-700/20 active:scale-[0.99]'
              : 'bg-slate-300 cursor-not-allowed shadow-none'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu thuê phòng'}</span>
        </button>
      </div>

      {/* Assurance Note */}
      <p className="text-center text-xs text-slate-500 leading-relaxed pt-1">
        Bạn chưa cần thanh toán tiền cọc ở bước này. Yêu cầu của bạn sẽ được gửi đến chủ trọ để xem xét.
      </p>
    </article>
  );
};
