import type { ManagementPhotoStripProps } from '../types';

export function ManagementPhotoStrip({ images, labels, uploadIcon }: ManagementPhotoStripProps) {
  return <div
    className="flex gap-2.5 [&>*]:h-16 [&>*]:min-w-0 [&>*]:flex-1 [&>*]:overflow-hidden [&>*]:rounded-sm [&>*]:border
      [&>*]:border-border-subtle [&_figure]:relative [&_figure>img]:h-full [&_figure>img]:w-full
      [&_figure>img]:object-cover [&_figcaption]:absolute [&_figcaption]:bottom-1 [&_figcaption]:left-[5px]
      [&_figcaption]:rounded-xs [&_figcaption]:bg-surface-card [&_figcaption]:px-[5px] [&_figcaption]:py-px
      [&_figcaption]:text-[10px] [&_figcaption]:text-text-primary max-[640px]:flex-wrap
      max-[640px]:[&>*]:basis-[28%]"
  >

    <button
      type="button"
      className="flex flex-col items-center justify-center gap-[5px] border-dashed bg-canvas text-[10px] text-text-primary
        disabled:cursor-not-allowed"
      disabled
      title="Ảnh mẫu minh họa. Upload sẽ được tích hợp sau."
    >
      <img
        src={uploadIcon}
        alt=""
      />
      Thêm ảnh
    </button>

    {images.map((src, index) => <figure key={src}>
      <img
        src={src}
        alt={`Ảnh mẫu ${labels[index]}`}
      />
      <figcaption>
        {labels[index]}
      </figcaption>
    </figure>)}

  </div>;
}
