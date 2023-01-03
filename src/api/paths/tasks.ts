import { CreateTaskRequest, ListTasksResponse, Task } from "../../../types/Makerlog";
import { client } from "../client";

async function listUserTasks(): Promise<ListTasksResponse> {
  const res = await client.get("/tasks/");
  return res.data;
}

async function addUserTask(data: CreateTaskRequest): Promise<Task> {
  const res = await client.post("/tasks/", data);
  return res.data;
}

export default {
  listUserTasks,
  addUserTask,
};
