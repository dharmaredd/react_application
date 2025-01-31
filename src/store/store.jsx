import { configureStore } from "@reduxjs/toolkit";
import tasksSlicer from "../slicers/tasks-slicer";

const store = configureStore({
    reducer:{
        tasks: tasksSlicer
    }
})

export default store;