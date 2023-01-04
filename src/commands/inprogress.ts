import { Arguments, CommandBuilder } from "yargs";
import chalk from "chalk";
import { makerlog } from "../api/api";
import { setAxiosAuth } from "../api/client";
import { buildTaskRequest, errorOutput, logOutput } from "../services/utils";

export interface Options {
  name: string;
  description: string;
}

export const command = "inprogress <task> [description]";
export const desc = "Add an in-progress task to Makerlog";

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
    .example([[`makerlog inprogress "new task here"`]])
    .fail((message, error, yargs) => {
      return errorOutput(error);
    });
};

export async function handler(argv: Arguments<Options>) {
  try {
    await setAxiosAuth();

    const data = await buildTaskRequest(argv, "in-progress");
    const response = await makerlog.createTask(data);

    return logOutput([`${chalk.bgYellow.whiteBright.bold(" IN PROGRESS ")} ${response.content} 🎉`]);
  } catch (e: any) {
    return errorOutput(e);
  }
}

