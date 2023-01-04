import notifications from "./paths/notifications";
import tasks from "./paths/tasks";
import user from "./paths/user";

export const makerlog = {
  ...notifications,
  ...tasks,
  ...user,
};
