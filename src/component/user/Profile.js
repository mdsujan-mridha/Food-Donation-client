import { LoginOutlined } from '@mui/icons-material';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';

const Profile = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginSubmitHandler = (e) => {
        e.preventDefault();
        console.log(email, password);
    }

    const loading = false;

    return (
        <Fragment>
            {
                loading ? (
                    <Loader />
                ) :
                    (
                        <Fragment>
                            <div className="flex justify-center items-center flex-col translate-y-1/2">
                                <div className="card w-96 bg-accent text-neutral-content shadow-2xl">
                                    <h1 className='flex justify-center items-center text-2xl text-black font-bold py-5 gap-4'> <LoginOutlined /> Login </h1>
                                    <div>
                                        <form className='p-7 flex flex-col gap-5' onSubmit={loginSubmitHandler}>
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="input input-bordered input-secondary w-full"
                                                style={{ outline: 'none' }}
                                            />
                                            <input
                                                type="password"
                                                placeholder="Enter your password"
                                                className="input input-bordered input-secondary w-full"
                                                style={{ outline: 'none' }}
                                            />
                                            <input type="submit" value="Login" className="btn btn-active btn-primary" />
                                        </form>
                                        <p className='flex justify-between items-center p-8 text-primary'>  <Link> Forgot password </Link>
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

export default Profile;