import { AddEditViewTask } from "./AddEditViewTask"
import { useParams,useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../slicers/tasks-slicer";
export function EditTask() {
    const params = useParams();
    const tasks = useSelector((state) => state.tasks.tasks);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const task = tasks.find((task) => task.taskId.toString() === params.id);
    function updateTask(taskData) {
        const payload = {
            title:taskData.title,
            assignedTo: taskData.assignedTo,
            status:  taskData.status,
            priority: taskData.priority,
            startDate: taskData.startDate,
            endDate: taskData.endDate,
            taskId: task.taskId
        };
        dispatch(taskActions.editTask(payload));
        navigate('/');
    }

    return (
        <AddEditViewTask title="Edit" taskData={task} newTaskPayload={updateTask}>
        </AddEditViewTask>
    )
}