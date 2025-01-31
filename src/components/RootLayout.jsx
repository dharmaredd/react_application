import { NavBar } from "./NavBar";
import { Outlet } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../slicers/tasks-slicer';

export function RootLayout() {
  let dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);
    return(
        <>
        <NavBar></NavBar>
        <main >
          <Outlet></Outlet>
        </main>
      </>
    )
}