// QUERIES
export const ALL_SETTINGS = "settings";
export const INDEXES = "indexes";
export const STATS = "stats";

// Routes

export const DASHBOARD_ROUTE = "/dashboard";
export const SINGLE_INDEX = (uid) => `/dashboard/index/${uid}`;

export const INDEX_TABS = ["documents", "settings"];

// local Storage keys
const COMMON_KEY_PART = "record-ui";
export const KEY_KEY = `${COMMON_KEY_PART}-key`;
export const HOST_KEY = `${COMMON_KEY_PART}-hsot`;
export const KEY_KEYS = `${COMMON_KEY_PART}-keys`;
