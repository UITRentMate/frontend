import {
  Banknote, GraduationCap, Clock, SprayCan, Moon, CigaretteOff, Brush, CookingPot,
  FileText, Receipt, Gauge, Wrench, Building, UserCheck, ClipboardList, CircleCheckBig,
} from 'lucide-react';
import { ROUTES } from '@/routes/paths';
import { roomStudioBalcony, roomLoft, roomEnclosed } from '@/assets/landing';
import type {
  FeaturedRoom,
  FeatureItem,
  FooterColumn,
  HeroStat,
  HowItWorksStep,
  LivingBook,
  OwnerSummary,
  RoommateProfile,
} from '../types';

// Mock data cho trang Landing. Khi API sẵn sàng sẽ thay bằng service/hook (không hardcode trong component).

export const featuredRooms: FeaturedRoom[] = [
  { id: 1, image: roomStudioBalcony, tag: 'Studio ban công', price: '5.800.000', area: '28 m²', title: 'Studio ban công ngập tràn ánh sáng', address: 'Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh', amenities: ['Ban công riêng', 'Máy lạnh', 'Tủ lạnh', 'Giờ tự do'] },
  { id: 2, image: roomLoft, tag: 'Gác lửng cao', price: '4.500.000', area: '24 m²', title: 'Căn hộ dịch vụ gần ĐH Bách Khoa', address: 'Phường 14, Quận 10, TP. Hồ Chí Minh', amenities: ['Gác lửng đúc', 'Kệ bếp riêng', 'Máy giặt chung', 'Khóa vân tay'] },
  { id: 3, image: roomEnclosed, tag: 'Phòng khép kín', price: '3.200.000', area: '20 m²', title: 'Phòng trọ khép kín yên tĩnh', address: 'Phường Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh', amenities: ['Vệ sinh khép kín', 'Wifi tốc độ cao', 'Chỗ để xe trong nhà'] },
];

export const heroStats: HeroStat[] = [
  { label: 'Dữ liệu thực tế', value: 'Minh bạch 100%' },
  { label: 'Chỉ số sinh hoạt', value: 'Điện & Nước số' },
  { label: 'Kết nối người ở', value: 'Đúng nếp sống' },
];

export const roommateCriteria: FeatureItem[] = [
  { icon: Banknote, title: 'Ngân sách dự kiến', desc: 'Mức tiền phòng & chi phí sinh hoạt hàng tháng có thể cùng chia sẻ.' },
  { icon: GraduationCap, title: 'Trường học & Nơi làm việc', desc: 'Trường đại học, viện nghiên cứu hoặc khu công nghệ lân cận khu vực trọ.' },
  { icon: Clock, title: 'Lối sống & Giờ giấc', desc: 'Ngủ sớm hay cú đêm, thói quen nấu ăn tại phòng, mức độ giữ không gian yên tĩnh.' },
  { icon: SprayCan, title: 'Thói quen sinh hoạt & Vệ sinh', desc: 'Phân chia dọn hàng tuần, không hút thuốc, quy định dẫn bạn bè về phòng.' },
];

export const roommateProfile: RoommateProfile = {
  initials: 'MH',
  name: 'Minh Hoàng',
  meta: '21 tuổi • Sinh viên năm 3 ĐH Bách Khoa TP.HCM',
  rows: [
    { label: 'Ngân sách mong muốn:', value: '2.000.000 – 2.500.000 đ/tháng', highlight: true },
    { label: 'Khu vực tìm phòng:', value: 'Quận 10, Quận 11, Tân Bình', highlight: false },
    { label: 'Chuyên ngành:', value: 'Khoa KH & Kỹ thuật Máy tính', highlight: false },
    { label: 'Quê quán:', value: 'TP. Đà Nẵng', highlight: false },
  ],
  habits: [
    { icon: Moon, text: 'Ngủ sau 23h30' },
    { icon: CigaretteOff, text: 'Tuyệt đối không hút thuốc' },
    { icon: Brush, text: 'Trực nhật dọn phòng thứ 7' },
    { icon: CookingPot, text: 'Nấu ăn tối tại phòng' },
  ],
};

export const tenantFeatures: FeatureItem[] = [
  { icon: FileText, title: 'Thông tin hợp đồng thuê', desc: 'Lưu trữ số tiền đặt cọc, thời hạn thuê, ngày đối soát và chứng từ hợp đồng số hóa an toàn.' },
  { icon: Receipt, title: 'Hóa đơn và khoản phải trả', desc: 'Bảng kê chi tiết tiền phòng, định mức dịch vụ mỗi tháng kèm trạng thái thanh toán minh bạch.' },
  { icon: Gauge, title: 'Chỉ số điện và nước', desc: 'Nhập và đối chiếu số đồng hồ mỗi chu kỳ, tự động tính theo đơn giá niêm yết rõ ràng.' },
  { icon: Wrench, title: 'Báo sự cố phòng trọ', desc: 'Gửi phiếu yêu cầu sửa chữa kèm hình ảnh trực tiếp đến ban quản lý và cập nhật tiến độ xử lý.' },
];

export const livingBook: LivingBook = {
  title: 'Sổ sinh hoạt phòng 204',
  subtitle: 'Căn hộ dịch vụ Hòa Hưng • Hợp đồng đến 31/08/2025',
  roomCode: 'P.204',
  period: 'Kỳ thanh toán Tháng 02/2025',
  total: '6.240.000 ₫',
  status: 'Đã thanh toán',
  lines: [
    { label: 'Tiền phòng cố định:', value: '5.800.000 ₫', highlight: false },
    { label: 'Điện (110 kWh × 3.500đ):', value: '385.000 ₫', highlight: false },
    { label: 'Nước sinh hoạt (2 người):', value: '55.000 ₫', highlight: false },
    { label: 'Tiền cọc lưu giữ:', value: '5.800.000 ₫ (Đã giữ)', highlight: true },
  ],
  ticket: { title: 'Yêu cầu bảo trì vòi lavabo', note: 'Kỹ thuật viên đã tiếp nhận • Lịch kiểm tra 14:00', status: 'Đang xử lý' },
};

export const ownerFeatures: FeatureItem[] = [
  { icon: Building, title: 'Quản lý phòng trống & đăng thuê', desc: 'Cập nhật nhanh tình trạng buồng phòng, thông tin người ở và lịch đóng tiền.' },
  { icon: UserCheck, title: 'Xét duyệt yêu cầu thuê minh bạch', desc: 'Nhận hồ sơ từ sinh viên, người đi làm với đầy đủ thông tin xác minh ban đầu.' },
  { icon: ClipboardList, title: 'Lập hóa đơn & chốt số điện nước', desc: 'Tự động tính tiền điện nước theo biểu phí rõ ràng và gửi bảng kê đến từng phòng.' },
  { icon: CircleCheckBig, title: 'Điều phối sửa chữa sự cố', desc: 'Tiếp nhận thông báo hỏng hóc kèm hình ảnh và cập nhật tiến độ giải quyết tức thì.' },
];

export const ownerSummary: OwnerSummary = {
  name: 'Khu nhà trọ Hòa Hưng',
  address: 'Phường 14, Quận 10 • 8 phòng vận hành',
  occupancy: '8/8 Đang thuê',
  expected: '42.800.000 ₫',
  collectedLabel: 'Đã thu 6/8 phòng',
  collected: '32.100.000 ₫ (75%)',
  meters: [
    { room: 'Phòng 102 (Studio tầng 1)', status: 'Đã nhập (184 kWh)', done: true },
    { room: 'Phòng 201 (Ban công)', status: 'Chờ nhập (5 m³)', done: false },
    { room: 'Phòng 204 (Gác lửng)', status: 'Đã nhập (110 kWh)', done: true },
  ],
};

export const howItWorksSteps: HowItWorksStep[] = [
  { n: '01', title: 'Tìm kiếm & Thiết lập tiêu chí', desc: 'Khám phá phòng trọ phù hợp theo khu vực hoặc tạo hồ sơ tìm bạn ở ghép với ngân sách và thói quen sinh hoạt cụ thể.' },
  { n: '02', title: 'Kết nối & Xem phòng thực tế', desc: 'Xem chi tiết điều khoản, gửi trao đổi trực tiếp tới chủ nhà hoặc bạn cùng phòng để thống nhất việc ký hợp đồng bên ngoài.' },
  { n: '03', title: 'Theo dõi & Số hóa sinh hoạt', desc: 'Theo dõi hóa đơn định kỳ, chốt số điện nước minh bạch và phản ánh sự cố sửa chữa nhanh chóng trong suốt thời gian ở.' },
];


// `to` là route nội bộ (ROUTES); `href` là anchor tạm cho trang pháp lý chưa có.
export const footerColumns: FooterColumn[] = [
  {
    heading: 'Giải pháp',
    links: [
      { label: 'Tìm phòng', to: ROUTES.ROOMS },
      { label: 'Ghép người ở ghép', to: ROUTES.ROOMS },
      { label: 'Dành cho chủ trọ', to: ROUTES.LANDLORD_DASHBOARD },
    ],
  },
  {
    heading: 'Pháp lý & Quy định',
    links: [
      { label: 'Quy chế hoạt động', href: '#rules' },
      { label: 'Chính sách bảo mật', href: '#privacy' },
      { label: 'Điều khoản sử dụng', href: '#terms' },
    ],
  },
];
