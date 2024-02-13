import React, { Fragment } from 'react';

const Loader = () => {
    return (
        <Fragment>
            <div style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <button className="btn btn-square">
                    <span className="loading loading-spinner"></span>
                </button>
            </div>
        </Fragment>
    );
};

export default Loader;