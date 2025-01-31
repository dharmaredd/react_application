import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    tasks: []
}
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
      const response = await axios.get('tasks.json');
      return response.data;
    }
  );
const tasksSlice = createSlice({
    name: 'Tasks',
    initialState,
    reducers: {
        addToSaveTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.taskId !== action.payload);
          },
          editTask(state, payload) {
            const task = state.tasks.find(
              (task) => task.taskId.toString() === payload.payload.taskId.toString()
            );
            if (task) {
              task.title = payload.payload.title;
              task.assignedTo = payload.payload.assignedTo;
              task.status = payload.payload.status;
              task.priority = payload.payload.priority;
              task.startDate = payload.payload.startDate;
              task.endDate = payload.payload.endDate;
            }
          },
    },
    extraReducers: (builder) => {
       
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action.payload;
          })
    }
})

export const taskActions = tasksSlice.actions;
export default tasksSlice.reducer;