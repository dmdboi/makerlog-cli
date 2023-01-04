import { Arguments, CommandBuilder } from "yargs";
import chalk from "chalk";
import { makerlog } from "../api/api";
import { setAxiosAuth } from "../api/client";
import { buildTaskRequest, errorOutput, logOutput } from "../services/utils";

export interface Options {
  name: string;
  description: string;
}

export const command = "done <name> [description]";
export const desc = "Add a completed task to Makerlog";

export const builder: CommandBuilder<any> = (yargs) => {
  return yargs
    .positional("name", {
      describe: "Name of task",
      type: "string",
    })
    .positional("description", {
      describe: "Task description",
      type: "string",
    })
    .example([[`makerlog done "new task here"`]])
    .fail((message, error, yargs) => {
      return errorOutput(error);
    });
};

export async function handler(argv: Arguments<Options>) {
  try {
    await setAxiosAuth();

    const data = await buildTaskRequest(argv, "done");
    const response = await makerlog.createTask(data);

    return logOutput([`${chalk.bgGreen.whiteBright.bold(" DONE ")} ${response.content} 🎉`]);
  } catch (e: any) {
    return errorOutput(e);
  }
}
