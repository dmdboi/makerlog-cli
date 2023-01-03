export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  description: string;
  verified: boolean;
  private: boolean;
  avatar: string;
  streak: number;
  timezone: string;
  week_tda: number;
  twitter_handle: string;
  instagram_handle: string;
  product_hunt_handle: string;
  github_handle: string;
  telegram_handle: string;
  nomadlist_handle: string;
  bmc_handle: string;
  header: string;
  is_staff: boolean;
  donor: boolean;
  shipstreams_handle: string;
  website: string;
  tester: boolean;
  is_live: boolean;
  digest: boolean;
  patron: boolean;
  dark_mode: boolean;
  ads_enabled: boolean;
  weekends_off: boolean;
  hardcore_mode: boolean;
  email_notifications: boolean;
  og_image: string;
  date_joined: Date;
  follower_count: number;
  is_moderator: boolean;
}

export interface Task {
  id: number;
  event: string;
  done: boolean;
  in_progress: boolean;
  content: string;
  created_at: Date;
  updated_at: Date;
  done_at: Date;
  user: User;
  description: string;
  project_set: Array<any>;
  product_set: Array<any>;
  praise: number;
  attachment: string;
  comment_count: number;
  og_image: string;
  video: string;
}

/**
 *
 * API Requests & Responses
 *
 */

export interface ListTasksResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Task[];
}

export interface CreateTaskRequest {
  done: boolean;
  in_progress: boolean;
  content: string;
  description?: string;
  attachment?: string;
  video?: string;
}
