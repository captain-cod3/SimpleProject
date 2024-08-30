export interface UserModel{
    id: number,
    name: string,
    avatar: string,
    designation?: string,
    totalTask?: number,
    completedTask?: number,
    remainingTask?: number
} 