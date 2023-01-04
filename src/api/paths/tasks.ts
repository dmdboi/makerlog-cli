import { CreateTaskRequest, ListTasksResponse, Task } from "../../../types/Makerlog";
import { client } from "../client";

/** List the latest 20 tasks by current user */
async function listTasks(): Promise<ListTasksResponse> {
  const res = await client.get("/tasks/");
  return res.data;
}

/** Create a new task in Makerlog */
async function createTask(data: CreateTaskRequest): Promise<Task> {
  const res = await client.post("/tasks/", data);
  return res.data;
}

export default {
  listTasks,
  createTask,
};
