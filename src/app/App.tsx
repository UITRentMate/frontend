import { useState } from 'react';
import { ScheduleTourPage } from '../pages/ScheduleTourPage';
import { RentalRequestPage } from '../pages/RentalRequestPage';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<'schedule-tour' | 'rental-request'>('schedule-tour');

  return (
    <div className="relative">
      {/* Floating Demo Screen Switcher */}
      <aside
        aria-label="Demo Navigation"
        className="fixed bottom-4 right-4 z-50 bg-slate-900/90 backdrop-blur-md text-white p-2 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 text-xs"
      >
        <span className="font-semibold px-2 text-slate-300">Xem màn hình:</span>
        <button
          type="button"
          onClick={() => setCurrentScreen('schedule-tour')}
          className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
            currentScreen === 'schedule-tour'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          Đặt lịch xem phòng
        </button>
        <button
          type="button"
          onClick={() => setCurrentScreen('rental-request')}
          className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
            currentScreen === 'rental-request'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          Gửi yêu cầu thuê
        </button>
      </aside>

      {currentScreen === 'schedule-tour' ? (
        <ScheduleTourPage />
      ) : (
        <RentalRequestPage />
      )}
    </div>
  );
}

export default App;
