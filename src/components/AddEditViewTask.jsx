import { Container, Grid, InputLabel } from "@mui/material";
import { Stack } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import { FormControl } from "@mui/material";
import { Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from "formik";
import dayjs from "dayjs";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';

const useStyle = makeStyles((theme) => ({
    fontStyle: {
        width: "50%",
        margin: "auto",
        padding: 20,
        boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            padding: 10,
        }
    },
    myBtnStyle: {
        width: "15%",

    }
}));

export function AddEditViewTask({ title, newTaskPayload, taskData }) {
    const navigate = useNavigate();
    const classes = useStyle({});
    const theme = useTheme();
    const [status] = useState(['Not Started', 'In Progress', 'Completed', 'Over Due']);
    const [priority] = useState(['Low', 'Mediam', 'High']);
    const [isDisable] = useState(title === 'View' ? true : false);

    const formik = useFormik({
        initialValues: {
            title: title === 'Add' ? '' : taskData.title,
            assignedTo: title === 'Add' ? '' : taskData.assignedTo,
            status: title === 'Add' ? 'Not Started' : taskData.status,
            priority: title === 'Add' ? 'Low' : taskData.priority,
            startDate: title === 'Add' ? dayjs() : dayjs(taskData.startDate, 'DD-MM-YYYY'),
            endDate: title === 'Add' ? dayjs() : dayjs(taskData.endDate, 'DD-MM-YYYY')
        },
        validate: validateForm,
        onSubmit: ((values) => {
            const formattedValues = {
                ...values,
                startDate: values.startDate.format('DD-MM-YYYY'),
                endDate: values.endDate.format('DD-MM-YYYY'),
            };
            newTaskPayload(formattedValues);
        })
    })


    function validateForm(formData) {
        const errors = {};
        if (formData.title.length === 0) {
            errors.title = 'Title is required';
        }
        if (formData.assignedTo.length === 0) {
            errors.assignedTo = 'Assigned To is required';
        }
        return errors;
    }

    function backToDashboard() {
        navigate('/');
    }

    function handleEdit() {
        navigate(`/edit-task/${taskData.taskId}`);
    }

    return (
        <Container maxWidth="xl" style={{ marginTop: "10px" }}>
            <Stack
                direction="row"
                spacing={2}
                sx={{

                    alignItems: "flex-start",
                    color: '#4a148c'
                }}>
                <ArrowBackIcon fontSize="large" style={{ paddingTop: '5px', paddingRight: '10px', cursor: 'pointer' }} onClick={backToDashboard}> </ArrowBackIcon>
                <h2 style={{ color: '#c62828' }}>
                    {title} Task</h2>
            </Stack>
            <Stack>
                <form onSubmit={formik.handleSubmit} className={classes.fontStyle}>
                    {/* <FormGroup > */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12}>
                            <FormControl fullWidth>
                                <TextField helperText={formik.touched.title && formik.errors.title}
                                    error={formik.touched.title && Boolean(formik.errors.title)} onBlur={formik.handleBlur} value={formik.values.title} disabled={(isDisable || title === 'Edit')} id="outlined-basic" size="small" label="Title" variant="outlined" onChange={formik.handleChange} name="title" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <FormControl fullWidth>
                                <TextField helperText={formik.touched.assignedTo && formik.errors.assignedTo}
                                    error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)} onBlur={formik.handleBlur} value={formik.values.assignedTo} disabled={isDisable} id="outlined-basic" size="small" label="Assigned To" variant="outlined" onChange={formik.handleChange} name="assignedTo" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <FormControl size="small" fullWidth >
                                <InputLabel id="status">Status</InputLabel>
                                <Select
                                    labelId="status"
                                    id="status-small"
                                    label="Status" disabled={isDisable}
                                    value={formik.values.status}
                                    onChange={formik.handleChange} name="status"
                                > {
                                        status.map((status) =>
                                            <MenuItem key={status} value={status}>{status}</MenuItem>
                                        )
                                    }

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <FormControl size="small" fullWidth >
                                <InputLabel id="priority">Priority</InputLabel>
                                <Select
                                    labelId="priority"
                                    id="priority-small"
                                    label="Priority" disabled={isDisable}
                                    value={formik.values.priority}
                                    onChange={formik.handleChange} name="priority"
                                >
                                    {
                                        priority.map((priority) =>
                                            <MenuItem key={priority} value={priority}>{priority}</MenuItem>
                                        )
                                    }

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker disabled={isDisable}
                                        value={formik.values.startDate} format="DD-MM-YYYY"
                                        onChange={(date) => formik.setFieldValue('startDate', date)}
                                        label="Start Date"
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                sx: {
                                                    width: '100%',
                                                    [theme.breakpoints.down('sm')]: {
                                                        width: '100%',
                                                    },
                                                    [theme.breakpoints.up('md')]: {
                                                        width: '100%',
                                                    },
                                                }
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={formik.values.endDate} disabled={isDisable}
                                        onChange={(date) => formik.setFieldValue('endDate', date)}
                                        label="End Date" format="DD-MM-YYYY"
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                sx: {
                                                    width: '100%',
                                                    [theme.breakpoints.down('sm')]: {
                                                        width: '100%',
                                                    },
                                                    [theme.breakpoints.up('md')]: {
                                                        width: '100%',
                                                    },
                                                }
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            {
                                title !== 'View' ?
                                    <Button
                                        color="secondary"
                                        size="medium"
                                        type="submit"
                                        className={classes.myBtnStyle}
                                        variant="contained" >
                                        Save
                                    </Button> :
                                    <Button
                                        color="secondary"
                                        size="medium"
                                        onClick={handleEdit}
                                        className={classes.myBtnStyle}
                                        variant="contained" >
                                        Edit
                                    </Button>

                            }
                        </Grid>

                        {/* </FormGroup> */}
                    </Grid>
                </form>
            </Stack>
        </Container>
    )
}