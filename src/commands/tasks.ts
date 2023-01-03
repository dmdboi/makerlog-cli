import { CommandBuilder } from "yargs";

export interface Options {
  username?: string;
  password: string;
}

export const command = "tasks";
export const desc = "Create & List Tasks on Makerlog";

export const builder: CommandBuilder<Options, Options> = (yargs) => {
  return yargs
    .options({})
    .example([[`makerlog tasks`]])
    .commandDir("tasks")
    .fail((message, error, yargs) => {
      console.log(error);
    });
};
