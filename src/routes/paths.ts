export const ROUTES = {
  HOME: '/',
  ROOMS: '/rooms',
  ROOM_DETAIL: '/rooms/:id',
  CREATE_ROOM: '/rooms/new',
  SECONDHAND: '/secondhand',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ADMIN_DASHBOARD: '/admin/dashboard',
  LANDLORD_PROPERTIES: '/landlord/properties',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
