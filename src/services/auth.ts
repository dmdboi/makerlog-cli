import { outputJson, readJson, remove } from "fs-extra";
import { homedir } from "os";
import { join } from "path";

export interface Profile {
  token: string;
}

const configDir = join(homedir(), ".config", "makerlog", `auth.json`);

export async function saveUserAuth(token: string): Promise<Profile> {
  const data = {
    token: token,
  };

  await outputJson(configDir, data);
  return data;
}

export async function deleteUserAuth(): Promise<string> {
  await remove(configDir);
  return configDir;
}

export async function readUserAuth(): Promise<Profile> {
  const profile = await readJson(configDir);
  return profile.token;
}
