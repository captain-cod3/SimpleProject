import { TaskStatus } from "./enums/TaskStatusEnums";

export const DUMMY_TASKS = [

    {
        taskId: 1,
        description : "Do homework.",
        userId: 1,
        status: TaskStatus.Done
    },
    {
        taskId: 2,
        description : "Replace the oven sheets.",
        userId: 1,
        status: TaskStatus.InProgress
    },
    {
        taskId: 3,
        description : "Take scooby to walk",
        userId: 1,
        status: TaskStatus.InProgress
    },
    {
        taskId: 4,
        description : "Collect from the dryers.",
        userId: 3,
        status: TaskStatus.InProgress
    },
    {
        taskId: 5,
        description : "Create meetings for online classes",
        userId: 2,
        status: TaskStatus.InProgress
    }

];
