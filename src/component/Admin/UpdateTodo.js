import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
import { Description, Spellcheck } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getTodoDetails, updateTodo } from '../../action/todoAction';
import { toast } from 'react-toastify';
import { UPDATE_TODO_RESET } from '../../constant/todoConstant';

const UpdateTodo = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { error, todo } = useSelector((state) => state.todoDetails);
    const { loading, error: updateError, isUpdate } = useSelector((state) => state.todo);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");


    const productId = id;

    useEffect(() => {

        if (todo && todo?._id !== productId) {
            dispatch(getTodoDetails(productId))
        } else {
            setTitle(todo.title);
            setDescription(todo.description);

        }
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }
        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdate) {
            toast.success("Update product successful");
            navigate("/admin/dashboard")
            dispatch({ type: UPDATE_TODO_RESET });
        }

    }, [todo, error, updateError, dispatch, isUpdate, navigate, productId]);


    // update product handler 
    const updateProductHandlerSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title: title,
            description: description,
            user: user?._id
        };

        dispatch(updateTodo(productId, formData));

    }



    return (
        <Fragment>
            <MetaData title="Update todo" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductHandlerSubmit}
                    >
                        <h1>UpdateTodo</h1>
                        <div>
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder="Todo Title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <Description />
                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>
                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateTodo;