import React, { Fragment, useState } from 'react';
import Loader from '../Layout/Loader';
import { LoginOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState("");
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
                                <div className="card w-96 bg-primary text-neutral-content shadow-2xl">
                                    <h1 className='flex justify-center items-center text-2xl text-neutral font-bold py-5 gap-4'> <LoginOutlined /> Register </h1>
                                    <div>
                                        <form className='p-7 flex flex-col gap-5' onSubmit={loginSubmitHandler}>
                                            <input
                                                type="text"
                                                placeholder="Enter your email"
                                                className="input w-full bg-transparent shadow-2xl border-b-slate-50 outline-none text-white"
                                                value={name}
                                                required
                                                onChange={e => setName(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Enter your email"
                                                className="input w-full bg-transparent shadow-2xl border-b-slate-50 outline-none text-white"
                                                value={email}
                                                required
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                            <input
                                                type="password"
                                                placeholder="Enter your password"
                                                className="input w-full bg-transparent shadow-2xl border-b-slate-50 outline-none text-white"
                                                value={password}
                                                required
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                            <input type="submit" value="Register" className="btn btn-active btn-accent" />
                                        </form>
                                        <p className='flex justify-between items-center p-8 text-neutral'>  <Link> Forgot password </Link>
                                            <Link to="/"> Have account? </Link>
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

export default Register;