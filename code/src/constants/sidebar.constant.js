import ROUTES from "./routes.constant";

const SIDEBAR = {
  dashboard: {
    name: "Dashboard",
    link: ROUTES.dashboard.home,
  },
  profile: {
    name: "Profile",
    link: ROUTES.dashboard.profile,
  },
  settings: {
    name: "Settings",
    link: ROUTES.dashboard.settings,
  },
};

export default SIDEBAR;
