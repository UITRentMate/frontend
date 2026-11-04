import React from 'react';
import type { CampusSafetyAlertProps } from '../types';

export const CampusSafetyAlert: React.FC<CampusSafetyAlertProps> = ({
  type = 'safety',
  message,
  className = '',
}) => {
  if (type === 'warning') {
    return (
      <div className={`p-4 bg-warning-soft border border-warning-border rounded-md flex items-start gap-3 shadow-soft-xs ${className}`}>
        <span className="text-warning text-lg leading-none">⚠️</span>
        <div className="text-xs text-[#78350F] leading-relaxed">
          <strong className="font-semibold block mb-0.5">Lưu ý an toàn:</strong>
          {message || 'Nên hẹn gặp trực tiếp tại sảnh KTX hoặc căn tin trường để kiểm tra đồ trước khi trao đổi.'}
        </div>
      </div>
    );
  }

  if (type === 'info') {
    return (
      <div className={`p-4 bg-info-soft border border-info-border rounded-md flex items-start gap-3 shadow-soft-xs ${className}`}>
        <span className="text-info text-lg leading-none">💡</span>
        <div className="text-xs text-[#075985] leading-relaxed">
          <strong className="font-semibold block mb-0.5">Mẹo sinh viên:</strong>
          {message || 'Xác minh thẻ sinh viên của người đăng để đảm bảo an toàn và nhận giá ưu đãi chuẩn KTX.'}
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 bg-warning-soft border border-warning-border rounded-md flex items-start gap-3 shadow-soft-xs ${className}`}>
      <span className="text-warning text-lg leading-none">🛡️</span>
      <div className="text-xs text-[#78350F] leading-relaxed">
        <strong className="font-semibold block mb-0.5">Campus Safety First:</strong>
        {message || 'Nên hẹn gặp trực tiếp tại sảnh KTX hoặc canteen trường để kiểm tra phòng/đồ dùng trước khi thanh toán cọc.'}
      </div>
    </div>
  );
};

export default CampusSafetyAlert;
