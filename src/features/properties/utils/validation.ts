import { MOCK_ADDRESS_OPTIONS } from '../constants';
import type { PropertyFormErrors, PropertyFormValues } from '../types';

export function validatePropertyForm(values: PropertyFormValues): PropertyFormErrors {
  const errors: PropertyFormErrors = {};
  if (!values.name.trim()) errors.name = 'Vui lòng nhập tên khu trọ.';
  const city = MOCK_ADDRESS_OPTIONS.find((option) => option.city === values.city);
  const district = city?.districts.find((option) => option.name === values.district);
  if (!city) errors.city = 'Vui lòng chọn tỉnh / thành phố.';
  if (!district) errors.district = 'Vui lòng chọn quận / huyện.';
  if (!district?.wards.includes(values.ward)) errors.ward = 'Vui lòng chọn phường / xã.';
  if (!values.street.trim()) errors.street = 'Vui lòng nhập số nhà, tên đường.';
  return errors;
}
