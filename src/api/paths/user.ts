import { User } from "../../../types/Makerlog";
import { client } from "../client";

async function showCurrentUser(): Promise<User> {
  const res = await client.get("/me");
  return res.data;
}

export default {
    showCurrentUser
};
