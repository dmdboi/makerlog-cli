import { Arguments, CommandBuilder } from "yargs";
import chalk from "chalk";
import { makerlog } from "../api/api";
import { errorOutput } from "../services/utils";
import { setAxiosAuth } from "../api/client";

export interface Options {
  username?: string;
  password: string;
}

export const command = "user";
export const desc = "Show information on the current User";

export const builder: CommandBuilder<Options, Options> = (yargs) => {
  return yargs.example([[`makerlog user`]]).fail((message, error, yargs) => {
    errorOutput(error);
  });
};

export async function handler(argv: Arguments<Options>) {
  try {
    await setAxiosAuth();

    const user = await makerlog.getUserProfile();

    console.log(chalk.green("-----------------------------------"));
    console.log(chalk.bold.green("Username"), `   : ${user.username} - ${user.streak} 🔥`);
    console.log(chalk.bold.green("Joined"), `     : ${new Date(user.date_joined).toDateString()}`);
    console.log(chalk.bold.green("Description"), `: ${user.description}`);
    console.log(chalk.bold.green("Timezone"), `   : ${user.timezone}`);
    console.log(chalk.green("-----------------------------------"));
  } catch (e: any) {
    console.error(e);
  }
}
