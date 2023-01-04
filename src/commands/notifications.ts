import { CommandBuilder } from "yargs";

export interface Options {
  username?: string;
  password: string;
}

export const command = "notifications";
export const desc = "Manage notifications";

export const builder: CommandBuilder<Options, Options> = (yargs) => {
  return yargs
    .options({})
    .example([[`makerlog notifications`]])
    .commandDir("notifications")
    .fail((message, error, yargs) => {
      console.log(error);
    });
};