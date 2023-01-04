import { ListNotificationsResponse, MarkAllReadNotificationResponse, Notification } from "../../../types/Makerlog";
import { client } from "../client";

/** Lists all notifications within the past 24 hours */
async function listNotifications(): Promise<ListNotificationsResponse> {
  const res = await client.get("/notifications/");
  return res.data;
}

/** List all unread notifications within the past 24 hours */
async function listUnreadNotifications(): Promise<ListNotificationsResponse> {
  const res = await client.get("/notifications/unread");
  return res.data;
}

/** Mark all notifications to read */
async function markAllReadNotifications(): Promise<MarkAllReadNotificationResponse> {
    const res = await client.get("/notifications/mark_all_read");
    return res.data;
  }
  

export default {
  listNotifications,
  listUnreadNotifications,
  markAllReadNotifications
};
