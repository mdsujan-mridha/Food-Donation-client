

import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
import { Description, Spellcheck } from '@mui/icons-material';
import { clearErrors, createTodo } from '../../action/todoAction';
import { NEW_TODO_RESET } from '../../constant/todoConstant';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import "./NewProduct.css";


const NewTodo = () => {
    const dispatch = useDispatch();
    const { error, loading, success } = useSelector((state) => state.newProduct);
    const { user } = useSelector((state) => state.user);
    // console.log(user);

    const navigate = useNavigate()
    const [name, setName] = useState("");

    const [description, setDescription] = useState("");



    useEffect(() => {
        if (error) {
            toast.error(error)
            console.log(error)
            dispatch(clearErrors());

        }
        if (success) {
            toast.success("Todo create successfully")
            navigate("/admin/dashboard")
            dispatch({ type: NEW_TODO_RESET })
        }
    }, [dispatch, error, success, navigate])

    const createProductSubmitHandler = (e) => {
        e.preventDefault()
        const formData = {
            title: name,
            description: description,
            user: user?._id
        };
        console.log(formData);
        dispatch(createTodo(formData));


    }





    return (
        <Fragment>
            <MetaData title="Create new todo" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create new Todo</h1>
                        <div>
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder="Todo Title"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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

export default NewTodo;