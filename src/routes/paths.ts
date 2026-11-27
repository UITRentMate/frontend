export const ROUTES = {
  HOME: '/',
  LANDING: '/landing',
  ROOMS: '/rooms',
  ROOM_DETAIL: '/rooms/:id',
  CREATE_ROOM: '/rooms/new',
  RENTAL_REQUEST: '/rental-request',
  ROOM_RENTAL_REQUEST: '/rooms/:id/rental-request',
  SCHEDULE_TOUR: '/schedule-tour',
  ROOM_SCHEDULE_TOUR: '/rooms/:id/schedule-tour',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  ADMIN_DASHBOARD: '/admin/dashboard',
  LANDLORD_DASHBOARD: '/landlord/dashboard',
  LANDLORD_PROPERTIES: '/landlord/properties',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
