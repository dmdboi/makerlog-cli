import { Arguments, CommandBuilder } from "yargs";
import { makerlog } from "../../api/api";
import { setAxiosAuth } from "../../api/client";
import { errorOutput, logOutput } from "../../services/utils";

export interface Options {
  name: string;
  description: string;
}

export const command = "read";
export const desc = "Mark all notifications to read";

export const builder: CommandBuilder<any> = (yargs) => {
  return yargs.example([[`makerlog notifications read`]]).fail((message, error, yargs) => {
    return errorOutput(error);
  });
};

export async function handler(argv: Arguments<Options>) {
  try {
    await setAxiosAuth();

    const response = await makerlog.markAllReadNotifications();

    return logOutput([`Marked ${response.count} notifications to read`]);
  } catch (e: any) {
    return errorOutput(e);
  }
}
