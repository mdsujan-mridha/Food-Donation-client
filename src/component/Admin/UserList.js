import React, { Fragment, useEffect } from 'react';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, deleteUser, getAllUser } from '../../action/userAction';
import { toast } from 'react-toastify';
import { DELETE_USER_RESET } from '../../constant/userConstant';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import "./userList.css";


const UserList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, users } = useSelector((state) => state.allUsers);

    const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success(message);
            navigate("/admin/dashboard");
            dispatch({ type: DELETE_USER_RESET });
        }
        dispatch(getAllUser());
    }, [dispatch, error, isDeleted, navigate, message, deleteError]);


    //   table data 
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Role",
            type: "string", // Corrected: Use "string" instead of "number" for role
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.row.role === "admin" // Corrected: Access role from params.row
                    ? "greenColor"
                    : "redColor";
            },
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params.row.id}`}> {/* Corrected: Access id from params.row */}
                            <Edit />
                        </Link>

                        <Button
                            onClick={() => deleteUserHandler(params.row.id)}
                        >
                            <Delete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            });
        });


    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default UserList;