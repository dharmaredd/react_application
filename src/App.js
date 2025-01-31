import './App.css';
import * as React from 'react';
import { RootLayout } from './components/RootLayout';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Dashboard } from './components/Dashboard';
import { AddTask } from './components/AddTask';
import { EditTask } from './components/EditTask';
import { ViewTask } from './components/ViewTask';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,  // 0px
        sm: 600,  // 600px
        md: 960,  // 960px
        lg: 1280,  // 1280px
        xl: 1920,  // 1920px
      },
    },
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout></RootLayout>,
      children: [
        {
          path: "/",
          element: <Dashboard></Dashboard>,
        },

        {
          path: "add-task",
          element:  <ThemeProvider theme={theme}><AddTask></AddTask></ThemeProvider>,
        },
        {
          path: "/edit-task/:id",
          element: <ThemeProvider theme={theme}><EditTask></EditTask></ThemeProvider>,
        },
        {
          path: "/view-task/:id",
          element: <ThemeProvider theme={theme}><ViewTask></ViewTask></ThemeProvider>,
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
