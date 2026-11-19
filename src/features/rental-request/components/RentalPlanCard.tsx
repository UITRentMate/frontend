import React from 'react';
import { Calendar, Users } from 'lucide-react';
import { ContractDurationOption } from '../../../types/rental-request';

interface RentalPlanCardProps {
  moveInDate: string;
  onMoveInDateChange: (val: string) => void;
  tenantCount: number;
  onTenantCountChange: (val: number) => void;
  maxTenants: number;
  contractDuration: ContractDurationOption;
  onContractDurationChange: (val: ContractDurationOption) => void;
  note: string;
  onNoteChange: (val: string) => void;
}

export const RentalPlanCard: React.FC<RentalPlanCardProps> = ({
  moveInDate,
  onMoveInDateChange,
  tenantCount,
  onTenantCountChange,
  maxTenants,
  contractDuration,
  onContractDurationChange,
  note,
  onNoteChange,
}) => {
  const maxChars = 250;

  return (
    <article className="w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Kế hoạch thuê phòng</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cung cấp thông tin ngày nhận phòng và quy mô người ở
          </p>
        </div>
      </div>

      <div className="pt-5 flex flex-col gap-5">
        {/* Row 1: Move-in Date & Tenant Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Move-in Date */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="move-in-date" className="font-bold text-slate-900">
                Ngày dự kiến vào ở <span className="text-red-500">*</span>
              </label>
              <span className="text-slate-400 text-[11px]">(DD/MM/YYYY)</span>
            </div>
            <div className="relative">
              <input
                id="move-in-date"
                type="text"
                value={moveInDate}
                onChange={(e) => onMoveInDateChange(e.target.value)}
                placeholder="01/11/2026"
                className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3.5 pr-10 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Tenant Count */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="tenant-count" className="font-bold text-slate-900">
                Số người dự kiến ở <span className="text-red-500">*</span>
              </label>
              <span className="bg-blue-50 border border-blue-100 text-blue-700 font-bold text-[10px] px-2 py-0.5 rounded-sm">
                Tối đa: {maxTenants} người
              </span>
            </div>
            <div className="relative">
              <select
                id="tenant-count"
                value={tenantCount}
                onChange={(e) => onTenantCountChange(Number(e.target.value))}
                className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3.5 pr-10 text-sm font-medium text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all cursor-pointer"
              >
                {Array.from({ length: maxTenants }, (_, i) => i + 1).map((count) => (
                  <option key={count} value={count}>
                    {count} người
                  </option>
                ))}
              </select>
              <Users className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 2: Contract Duration Options */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-xs text-slate-900">
            Thời hạn hợp đồng mong muốn <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 6 months */}
            <button
              type="button"
              onClick={() => onContractDurationChange('6_months')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                contractDuration === '6_months'
                  ? 'bg-blue-50/60 border-blue-700 ring-1 ring-blue-700 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${contractDuration === '6_months' ? 'text-blue-700' : 'text-slate-900'}`}>
                  6 tháng
                </span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    contractDuration === '6_months' ? 'border-blue-700' : 'border-slate-300'
                  }`}
                >
                  {contractDuration === '6_months' && (
                    <div className="w-2 h-2 rounded-full bg-blue-700" />
                  )}
                </div>
              </div>
              <p className={`text-[11px] mt-1.5 ${contractDuration === '6_months' ? 'text-blue-700/80 font-medium' : 'text-slate-500'}`}>
                Mức tối thiểu quy định
              </p>
            </button>

            {/* 12 months (Standard) */}
            <button
              type="button"
              onClick={() => onContractDurationChange('12_months')}
              className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                contractDuration === '12_months'
                  ? 'bg-blue-50/70 border-blue-700 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${contractDuration === '12_months' ? 'text-blue-700' : 'text-slate-900'}`}>
                  12 tháng
                </span>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    contractDuration === '12_months' ? 'border-blue-700' : 'border-slate-300'
                  }`}
                >
                  {contractDuration === '12_months' && (
                    <div className="w-2 h-2 rounded-full bg-blue-700" />
                  )}
                </div>
              </div>
              <p className={`text-[11px] mt-1.5 font-medium ${contractDuration === '12_months' ? 'text-blue-700' : 'text-slate-500'}`}>
                Hợp đồng tiêu chuẩn
              </p>
            </button>

            {/* Flexible */}
            <button
              type="button"
              onClick={() => onContractDurationChange('flexible')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                contractDuration === 'flexible'
                  ? 'bg-blue-50/60 border-blue-700 ring-1 ring-blue-700 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${contractDuration === 'flexible' ? 'text-blue-700' : 'text-slate-900'}`}>
                  Linh hoạt
                </span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    contractDuration === 'flexible' ? 'border-blue-700' : 'border-slate-300'
                  }`}
                >
                  {contractDuration === 'flexible' && (
                    <div className="w-2 h-2 rounded-full bg-blue-700" />
                  )}
                </div>
              </div>
              <p className={`text-[11px] mt-1.5 ${contractDuration === 'flexible' ? 'text-blue-700/80 font-medium' : 'text-slate-500'}`}>
                Thương lượng thêm với chủ
              </p>
            </button>
          </div>
        </div>

        {/* Row 3: Landlord Message Textarea */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="landlord-message" className="text-xs font-bold text-slate-900">
              Lời nhắn gửi chủ trọ <span className="font-normal text-slate-500">(Không bắt buộc)</span>
            </label>
            <span className="font-mono text-[11px] text-slate-500">
              {note.length} / {maxChars}
            </span>
          </div>
          <textarea
            id="landlord-message"
            rows={3}
            maxLength={maxChars}
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="Chào anh An, em làm kỹ sư phần mềm tại Q.1, lịch sinh hoạt gọn gàng, dự kiến dọn vào đúng đầu tháng 11 ạ."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white resize-none transition-all"
          />
        </div>
      </div>
    </article>
  );
};
