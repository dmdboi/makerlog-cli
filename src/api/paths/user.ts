import { User } from "../../../types/Makerlog";
import { client } from "../client";

/** Return information on current user */
async function getUserProfile(): Promise<User> {
  const res = await client.get("/me");
  return res.data;
}

export default {
  getUserProfile,
};
