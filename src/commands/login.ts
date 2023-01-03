import { Arguments, CommandBuilder } from "yargs";
import axios from "axios";
import * as qs from "qs";
import { saveUserAuth } from "../services/auth";

export interface Options {
  username?: string;
  password: string;
}

export const command = "login";
export const desc = "Login to Makerlog via Username & Password";

export const builder: CommandBuilder<Options, Options> = (yargs) => {
  return yargs
    .options({
      username: {
        desc: "username",
        demandOption: true,
        type: "string",
      },
      password: {
        desc: "password",
        demandOption: true,
        type: "string",
      },
    })
    .example([[`makerlog login [username] [password]`]])
    .fail((message, error, yargs) => {
      console.log(error);
    });
};

export async function handler(argv: Arguments<Options>) {
  try {
    const { username, password } = argv;

    const data = qs.stringify({
      username: argv.username,
      password: argv.password,
    });

    if (!username || !password) {
      return console.log("Please provide a username and password.");
    }

    const response = await axios.post("https://api.getmakerlog.com/api-token-auth/", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(`You are now logged in as ${username} 🎉`);

    return saveUserAuth(response.data.token);
  } catch (e: any) {
    console.log(e.response.data);
  }
}
