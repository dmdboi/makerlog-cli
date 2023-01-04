import chalk from "chalk";
import { Arguments, CommandBuilder } from "yargs";
import { makerlog } from "../api/api";
import { setAxiosAuth } from "../api/client";
import { errorOutput, getStatusEmoji } from "../services/utils";

export interface Options {
  username?: string;
  password: string;
}

export const command = "tasks";
export const desc = "List current user's tasks";

export const builder: CommandBuilder<Options, Options> = (yargs) => {
  return yargs
    .options({})
    .example([[`makerlog tasks list`]])
    .fail((message, error, yargs) => {
      return errorOutput(error);
    });
};

export async function handler(argv: Arguments<Options>) {
  try {
    await setAxiosAuth();
    const { results } = await makerlog.listTasks();

    results.length = 10;

    results.reverse().map(async (task) => {
      let status = await getStatusEmoji(task);
      console.log(`${status} [${new Date(task.created_at).toDateString()}] - ${task.content}`);
    });
  } catch (e: any) {
    return errorOutput(e);
  }
}
