import { MailOutline, PersonOutline, VerifiedUser } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../Layout/Loader";
import MetaData from "../Layout/MetaData";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserDetails, updateUser, clearErrors } from '../../action/userAction';
import { UPDATE_USER_RESET } from "../../constant/userConstant";


const UpdateUser = () => {
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate()
    const { id } = useParams();

    console.log(user);


    useEffect(() => {
        if (user & user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            setName(user?.name);
            setEmail(user?.email);
            setRole(user?.role);
        }
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }
        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("User profile update successfully");
            navigate("/admin/dashboard");
            dispatch({ type: UPDATE_USER_RESET })

        }
    }, [dispatch, error, updateError, navigate, isUpdated, id, user]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = {
            name: name,
            email: email,
            role: role,
        }

        dispatch(updateUser(id, myForm));
    };

    return (
        <Fragment>
            <MetaData title="Update User" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <form
                            className="createProductForm"
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User</h1>

                            <div>
                                <PersonOutline />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <MailOutline />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <VerifiedUser />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={
                                    updateLoading ? true : false || role === "" ? true : false
                                }
                            >
                                Update
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUser;