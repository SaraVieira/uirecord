// QUERIES
export const ALL_SETTINGS = "settings";
export const INDEXES = "indexes";
export const STATS = "stats";

// Routes

export const DASHBOARD_ROUTE = "/admin/dashboard";
export const SINGLE_INDEX = (uid) => `/admin/dashboard/index/${uid}`;

export const INDEX_TABS = [
   "documents",
   "settings",
];
