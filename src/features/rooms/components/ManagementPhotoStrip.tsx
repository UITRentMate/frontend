import type { MockPhotoStripProps } from '../types';

export function ManagementPhotoStrip({ images, labels, uploadIcon }: MockPhotoStripProps) {
  return <div className="management-photos">
    <button type="button" className="management-upload" disabled title="Ảnh mẫu minh họa. Upload sẽ được tích hợp sau."><img src={uploadIcon} alt="" />Thêm ảnh</button>
    {images.map((src, index) => <figure key={src}><img src={src} alt={`Ảnh mẫu ${labels[index]}`} /><figcaption>{labels[index]}</figcaption></figure>)}
  </div>;
}
