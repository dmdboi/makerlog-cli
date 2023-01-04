import { Arguments, CommandBuilder } from "yargs";
import chalk from "chalk";
import { makerlog } from "../../api/api";
import { setAxiosAuth } from "../../api/client";
import { errorOutput, logOutput } from "../../services/utils";
import { Notification } from "../../../types/Makerlog";

export interface Options {
  name: string;
  description: string;
}

export const command = "all";
export const desc = "Show unread notifications within past 24 hours";

export const builder: CommandBuilder<any> = (yargs) => {
  return yargs.example([[`makerlog notifications all`]]).fail((message, error, yargs) => {
    return errorOutput(error);
  });
};

export async function handler(argv: Arguments<Options>) {
  try {
    await setAxiosAuth();

    const { results } = await makerlog.listNotifications();

    const notifications: string[] = await Promise.all(
      results.map(async (j) => {
        const formattedNotification = await formatNotification(j);

        return formattedNotification;
      })
    );

    return logOutput(notifications.reverse());
  } catch (e: any) {
    return errorOutput(e);
  }
}

async function formatNotification(notification: Notification) {
  let action = "";
  let verb = "commented on a";

  if (notification.key === "task_commented") {
    action = "💬";
  }

  if (notification.key === "received_praise") {
    action = "👏";
  }

  if (notification.verb === "praised you") {
    verb = "praised your";
  }

  return `[${new Date(notification.created).toLocaleString("en-GB")}] ${action} ${chalk.green(notification.actor.username)} ${verb} ${
    notification.target_type
  }`;
}
