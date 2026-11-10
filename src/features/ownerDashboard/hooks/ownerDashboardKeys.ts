export const ownerDashboardKeys = {
  all: ['ownerDashboard'] as const,
  overview: () => [...ownerDashboardKeys.all, 'overview'] as const,
};
