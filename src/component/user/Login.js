import { LoginOutlined } from '@mui/icons-material';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, login } from '../../action/userAction';

const Login = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated } = useSelector((state) => state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginSubmitHandler = (e) => {
        e.preventDefault();
        console.log(email, password);
        dispatch(login(email, password));
    }

    //  redirect user 
    const redirect = location.search ? location.search.split("=")[1] : "/admin/dashboard";
    //  useEffect 
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            toast.success("Your Logged in")
            navigate(redirect)
        }
    }, [dispatch, error, navigate, isAuthenticated, redirect]);

    return (
        <Fragment>
            {
                loading ? (
                    <Loader />
                ) :
                    (
                        <Fragment>
                            <div className="flex justify-center items-center flex-col translate-y-1/2">
                                <div className="card w-96 bg-primary text-neutral-content shadow-2xl">
                                    <h1 className='flex justify-center items-center text-2xl text-neutral font-bold py-5 gap-4'> <LoginOutlined /> Login </h1>
                                    <div>
                                        <form className='p-7 flex flex-col gap-5' onSubmit={loginSubmitHandler}>
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="input w-full bg-transparent shadow-2xl border-b-slate-50 outline-none text-white"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                            <input
                                                type="password"
                                                placeholder="Enter your password"
                                                className="input w-full bg-transparent shadow-2xl border-b-slate-50 outline-none text-white"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                            <input type="submit" value="Login" className="btn btn-active btn-accent" />
                                        </form>
                                        <p className='flex justify-between items-center p-8 text-neutral'>  <Link> Forgot password </Link>
                                            <Link to="/register"> No account? </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
            }
        </Fragment>
    );
};

export default Login;