import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import store from '../store/store';
import { useEffect } from 'react';
import { taskActions } from '../slicers/tasks-slicer';
import { useDispatch } from "react-redux";

export function Dashboard() {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    let [title, setTitle] = useState('');
    let [tasks, setTasks] = useState([]);
    let [taskId, setTaskId] = useState();
    let dispatch = useDispatch();
    
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setTimeout(() =>{
            setTasks(store.getState().tasks.tasks);
        },500)
        
    }, []);
    const getStatusColor = (value) => {
        if (value === 'In Progress') {
            return '#311b92';
        } else if (value === 'Not Started') {
            return 'red';
        } else if (value === 'Completed') {
            return '#00c853';
        } else if (value === 'Over Due') {
            return 'purple';
        }
    };

    const getPriorityColor = (value) => {
        if (value === 'Low') {
            return '#2e7d32';
        } else if (value === 'Mediam') {
            return '#795548';
        } else if (value === 'High') {
            return '#ef6c00';
        }
    };

    function handleEdit(values) {
        navigate(`edit-task/${values.row.taskId}`);
    }
    function handleDelete(values) {
        setTaskId(values.row.taskId);
        setTitle(values.row.title);
        setOpen(true);
    }

    function handleDeleteOk() {
       
        dispatch(taskActions.removeTask(taskId));
        setTimeout(()=>{
            handleClose()
            setTasks(store.getState().tasks.tasks);
            
        },200);
        
    }

    function addTask() {
        navigate('add-task');
    }


    function handleCellClick(param, event) {
        if (param.field !== 'actions') {
            navigate(`view-task/${param.row.taskId}`);
        }
    };

    const columns = [
        { field: 'title', headerName: 'Title', width: 200, disableColumnMenu: true, headerClassName: 'grid-theme--header', },
        { field: 'assignedTo', headerName: 'Assigned To', width: 200, disableColumnMenu: true, headerClassName: 'grid-theme--header' },
        {
            field: 'status', headerName: 'Status', width: 170, disableColumnMenu: true, headerClassName: 'grid-theme--header',
            cellClassName: (params) => {
                return "status-color";
            },
            renderCell: (params) => {
                const color = getStatusColor(params.value);
                return (
                    <Box
                        sx={{
                            color: color,
                            width: "100%",
                            height: "100%",
                            fontWeight: 400
                        }}
                    >
                        {params.value}
                    </Box>
                );
            },
        },
        {
            field: 'priority', headerName: 'Priority', width: 200, disableColumnMenu: true, headerClassName: 'grid-theme--header',
            renderCell: (params) => {
                return (
                    <Chip label={params.value} style={{ background: `${getPriorityColor(params.value)}`, color: 'white', paddingLeft: '20px', paddingRight: '20px' }} />
                );
            }
        },
        { field: 'startDate', headerName: 'Start Date', width: 150, disableColumnMenu: true,  sortable: false, headerClassName: 'grid-theme--header' },
        { field: 'endDate', headerName: 'End Date', width: 150, disableColumnMenu: true, sortable: false, headerClassName: 'grid-theme--header' },
        {
            field: 'actions', headerName: 'Action', width: 246, disableColumnMenu: true, sortable: false, headerClassName: 'grid-theme--header',
            renderCell: (params) => {
                return (
                    <strong>
                        <Button
                            color="secondary"
                            size="small"
                            style={{ marginLeft: 16 }}
                            variant="contained" startIcon={<EditIcon />}
                            onClick={() => handleEdit(params)}>
                            Edit
                        </Button>
                        <Button
                            color="error"
                            size="small"
                            style={{ marginLeft: 16 }}
                            variant="contained" startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(params)}>
                            Delete
                        </Button>
                    </strong>
                )
            }
        }
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (

        <Container maxWidth="xl" style={{ marginTop: "20px" }}>
            <Stack
                direction="row-reverse"
                spacing={2}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    paddingBottom: '20px'
                }}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={addTask}>Add</Button>
                <h1 style={{ color: '#c62828' }}>Dashboard</h1>
            </Stack>
            <Paper sx={{ height: 371, width: '100%' }}>
                <DataGrid
                    rows={tasks}
                    columns={columns}
                    getRowId={(row) => row.taskId}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    disableRowSelectionOnClick
                    onCellClick={handleCellClick}
                    sx={{
                        boxShadow: 10,
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        }, '.MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },
                    }}
                />
            </Paper>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Confirmation ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Do you want to Delete this Task ?
                        <span style={{ color: 'red', display: 'inline-block', fontWeight: 700 }}>{`${title}`}</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleDeleteOk} autoFocus>Ok</Button>
                    <Button color='secondary' variant="contained" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}