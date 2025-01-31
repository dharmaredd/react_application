import { AddEditViewTask } from "./AddEditViewTask"
import { useParams } from "react-router";
import { useSelector } from "react-redux";
export function ViewTask() {
    const params = useParams();
    const tasks = useSelector((state) => state.tasks.tasks);
    const task = tasks.find((task) => task.taskId.toString() === params.id);
    return(
        <AddEditViewTask title="View" taskData={task}></AddEditViewTask>
    )
}