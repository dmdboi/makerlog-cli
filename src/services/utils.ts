import chalk from "chalk";
import { Task } from "../../types/Makerlog";

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
  if (e.response.data) {
    console.log(e.response.data);
  }

  return console.log(chalk.red('❌'), 'There was an error executing this command')
}
