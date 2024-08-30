import { TaskStatus } from "../enums/TaskStatusEnums";

export interface TaskModel{
    taskId: number,
    description: string,
    userId: number,
    status : TaskStatus
}