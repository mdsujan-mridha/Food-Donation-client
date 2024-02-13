

import React, { Fragment, useEffect } from 'react';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, deleteTodo, getAdminTodo } from '../../action/todoAction';
import { toast } from 'react-toastify';
import { DELETE_TODO_RESET } from '../../constant/todoConstant';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';

const TodoList = () => {

    const dispatch = useDispatch();
    const { error, todos } = useSelector((state) => state.todos);
    // console.log(products);
    //  delete product 
    const { error: deleteError, isDeleted } = useSelector((state) => state.todo);
    const navigate = useNavigate()
    const deleteProductHandler = (id) => {
        dispatch(deleteTodo(id));
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }
        if (deleteError) {
            toast.warn(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            toast.success("Todo deleted successfully")
            navigate("/admin/dashboard")
            dispatch({ type: DELETE_TODO_RESET })
        }
        dispatch(getAdminTodo())
    }, [error, dispatch, isDeleted, deleteError, navigate]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
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
                        <Link to={`/admin/todo/${params.row.id}`}>
                            <Edit />
                        </Link>
                        <Button
                            onClick={() => deleteProductHandler(params.row.id)}
                        >
                            <Delete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ]

    const rows = [];
    todos &&
        todos.forEach((item) => {
            rows.push({
                id: item?._id,
                name: item?.title,
            })
        })


    return (
        <Fragment>
            <MetaData title={`ALL Todo - Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL Todo List</h1>
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
                        autoHeight
                        className='productListTable'
                    >
                    </DataGrid>
                </div>
            </div>
        </Fragment>
    );
};

export default TodoList;