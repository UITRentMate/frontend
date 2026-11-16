import React from 'react';
import { howItWorksSteps } from '../services/mockData';
import { eyebrow, wrap } from '../constants';

export const HowItWorks: React.FC = () => (
  <section id="cach-hoat-dong" className="border-y border-border-subtle bg-canvas py-16">
    <div className={wrap}>
      <div className="text-center">
        <p className={eyebrow}>Quy trình vận hành</p>
        <h2 className="mt-3 font-heading text-3xl font-bold text-text-primary">Bắt đầu với RentMate thật đơn giản</h2>
        <p className="mt-2 text-text-secondary">
          Ba bước rõ ràng giúp bạn làm chủ toàn bộ kế hoạch tìm và quản lý chỗ ở minh bạch.
        </p>
      </div>
      <ol className="mt-12 grid gap-8 md:grid-cols-3">
        {howItWorksSteps.map(({ n, title, desc }) => (
          <li key={n} className="border-t-2 border-brand-500 pt-4">
            <span className="font-mono text-3xl text-brand-500">{n}</span>
            <h3 className="mt-3 font-heading font-bold text-text-primary">{title}</h3>
            <p className="mt-2 text-[15px] leading-6 text-text-secondary">{desc}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
