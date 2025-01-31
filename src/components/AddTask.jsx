import { AddEditViewTask } from "./AddEditViewTask"
import { useDispatch } from "react-redux";
import { taskActions } from "../slicers/tasks-slicer";
import { useNavigate } from 'react-router';

export function AddTask() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    function saveTask(payload) {
        payload["taskId"] = Math.random().toString();
        dispatch(taskActions.addToSaveTask(payload));
        navigate("/");
    }

    return (
        <AddEditViewTask title="Add" newTaskPayload={saveTask}></AddEditViewTask>
    )
}