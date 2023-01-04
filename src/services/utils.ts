import chalk from "chalk";
import { CreateTaskRequest, Task } from "../../types/Makerlog";

export async function getStatusEmoji(task: Task): Promise<String> {
  if (!task.done && !task.in_progress) {
    return chalk.red("❌");
  }
  if (!task.done && task.in_progress) {
    return chalk.yellow("⏩");
  }
  return chalk.green("✔");
}

export function errorOutput(e: any): any {
  console.log(e);
  return console.log(chalk.red("❌"), "There was an error executing this command");
}

export function logOutput(data: string[]): any {
  console.log(chalk.green("------------- MAKERLOG ------------"));

  data.map((i) => {
    console.log(i);
  });
  console.log(chalk.green("-----------------------------------"));
}

export async function buildTaskRequest(argv: { name: string; description?: string }, status: string) {
  // Set "done" as default
  const statusBooleans = await getStatus(status);

  if (!argv.name) {
    throw Error("Please provide a name for this task");
  }

  const data: CreateTaskRequest = {
    content: argv.name,
    description: argv.description ? argv.description : "",
    ...statusBooleans,
  };

  return data;
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

export async function link(text: string, url: string) {
  const OSC = "\u001B]";
  const BEL = "\u0007";
  const SEP = ";";

  return [OSC, "8", SEP, SEP, url, BEL, text, OSC, "8", SEP, SEP, BEL].join("");
}
