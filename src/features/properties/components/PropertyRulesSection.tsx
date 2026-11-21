import { managementAssets } from '@/assets/property-management';

import { VolumeXIcon } from '@/components/ui';

import { GATE_MODE_LABELS, QUIET_PET_RULES, SAFETY_RULES, VISITOR_RULES } from '../constants';
import type { PropertyRulesSectionProps } from '../types';

export function PropertyRulesSection({
  values,
  onChangeGateMode,
  onToggleRule,
}: PropertyRulesSectionProps) {
  return (
    <section className="rounded-xl border border-border-subtle bg-surface-card p-4 shadow-soft-xs">
      <div className="mb-3.5 flex items-start gap-2">
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-xs bg-brand-50 font-heading text-xs font-bold text-brand-500">
          04
        </span>
        <div>
          <h3 className="font-heading text-sm font-bold text-text-primary">
            Nội quy &amp; Điều khoản Hợp đồng số
          </h3>
          <p className="text-[11px] text-text-muted">
            Tự động kết xuất vào Điều 5 hợp đồng điện tử có tính pháp lý.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <fieldset className="rounded-lg border border-border-subtle bg-canvas/60 p-3">
          <legend className="sr-only">Giờ giấc ra vào</legend>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-brand-500">
            <img src={managementAssets.property.gateScheduleIcon} alt="" className="size-4" />
            <span>Giờ giấc ra vào</span>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <label className="flex cursor-pointer items-center gap-2 text-text-primary">
              <input
                type="radio"
                name="settings-gate-mode"
                checked={values.gateMode === 'free'}
                onChange={() => onChangeGateMode('free')}
                className="size-4 cursor-pointer accent-brand-500"
              />
              <span className={values.gateMode === 'free' ? 'font-semibold' : 'text-text-muted'}>
                {GATE_MODE_LABELS.free}
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-text-primary">
              <input
                type="radio"
                name="settings-gate-mode"
                checked={values.gateMode === 'scheduled'}
                onChange={() => onChangeGateMode('scheduled')}
                className="size-4 cursor-pointer accent-brand-500"
              />
              <span
                className={values.gateMode === 'scheduled' ? 'font-semibold' : 'text-text-muted'}
              >
                {GATE_MODE_LABELS.scheduled}
              </span>
            </label>
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-border-subtle bg-canvas/60 p-3">
          <legend className="sr-only">Khách thăm và Lưu trú</legend>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-brand-500">
            <img src={managementAssets.page.locationIcon} alt="" className="size-4" />
            <span>Khách thăm &amp; Lưu trú</span>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            {VISITOR_RULES.map((rule) => {
              const checked = values.visitorRules.includes(rule);
              return (
                <label
                  key={rule}
                  className="flex cursor-pointer items-center justify-between gap-2"
                >
                  <span className={checked ? 'font-medium text-text-primary' : 'text-text-muted'}>
                    {rule}
                  </span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleRule('visitorRules', rule)}
                    className="size-4 shrink-0 cursor-pointer accent-brand-500"
                  />
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-border-subtle bg-canvas/60 p-3">
          <legend className="sr-only">An toàn PCCC và Điện</legend>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-danger">
            <img src={managementAssets.property.fireSafetyIcon} alt="" className="size-4" />
            <span>An toàn PCCC &amp; Điện</span>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            {SAFETY_RULES.map((rule) => {
              const checked = values.safetyRules.includes(rule);
              return (
                <label
                  key={rule}
                  className="flex cursor-pointer items-center justify-between gap-2"
                >
                  <span className={checked ? 'font-medium text-text-primary' : 'text-text-muted'}>
                    {rule}
                  </span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleRule('safetyRules', rule)}
                    className="size-4 shrink-0 cursor-pointer accent-brand-500"
                  />
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-border-subtle bg-canvas/60 p-3">
          <legend className="sr-only">Yên tĩnh và Thú cưng</legend>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-secondary-600">
            <VolumeXIcon className="size-4 shrink-0" />
            <span>Yên tĩnh &amp; Thú cưng</span>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            {QUIET_PET_RULES.map((rule) => {
              const checked = values.quietPetRules.includes(rule);
              return (
                <label
                  key={rule}
                  className="flex cursor-pointer items-center justify-between gap-2"
                >
                  <span className={checked ? 'font-medium text-text-primary' : 'text-text-muted'}>
                    {rule}
                  </span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleRule('quietPetRules', rule)}
                    className="size-4 shrink-0 cursor-pointer accent-brand-500"
                  />
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>
    </section>
  );
}
