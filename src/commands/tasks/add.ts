import { Arguments, CommandBuilder } from "yargs";
import { CreateTaskRequest } from "../../../types/Makerlog";
import { makerlog } from "../../api/api";
import { setAxiosAuth } from "../../api/client";
import { errorOutput } from "../../services/utils";

export interface Options {
  name: string;
  status?: string;
  desc?: string;
}

export const command = "add";
export const desc = "Add a tasks to Makerlog";

export const builder: CommandBuilder<Options, Options> = (yargs) => {
  return yargs
    .options({
      name: { type: "string", desc: "Task name", demandOption: true },
      status: { type: "string", desc: "Task status" },
      desc: { type: "string", desc: "Task description" },
    })
    .example([[`makerlog tasks add --content new task here --status `]])
    .fail((message, error, yargs) => {
      return errorOutput(error);
    });
};

export async function handler(argv: Arguments<Options>) {
  try {
    await setAxiosAuth();

    // Set "done" as default
    const status = await getStatus(argv.status ? argv.status : "done");

    if (!argv.name) {
      throw Error("Please provide a name for this task");
    }

    const data: CreateTaskRequest = {
      content: argv.name,
      description: argv.desc,
      ...status,
    };

    const response = await makerlog.addUserTask(data);

    return console.log(`Added Task ${response.id} to Makerlog 🎉`);
  } catch (e: any) {
    return errorOutput(e);
  }
}

async function getStatus(status: string) {
  if (status === "to-do") {
    return {
      done: false,
      in_progress: false,
    };
  }

  if (status === "in-progress") {
    return {
      done: false,
      in_progress: true,
    };
  }

  return {
    done: true,
    in_progress: false,
  };
}
