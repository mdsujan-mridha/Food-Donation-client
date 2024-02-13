

import { Add, ChevronRight, Dashboard, ExpandMore, PostAdd, VerifiedUser } from '@mui/icons-material';

import { TreeItem, TreeView } from '@mui/x-tree-view';
import React from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to="/" className='flex justify-center items-center gap-2'>
                {/* <img src={logo} alt="Log" /> <p className='text-4xl font-bold text-primary'> Book Share </p> */}
            </Link>
            <Link to="/admin/dashboard">
                <p> <Dashboard /> Dashboard</p>
            </Link>
            <Link>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpandIcon={<ChevronRight />}

                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/">
                            <TreeItem nodeId="2" label="Add" icon={<Add />} />
                        </Link>
                        <Link to="/admin/products">
                            <TreeItem nodeId="3" label="All" icon={<PostAdd />} />
                        </Link>
                    </TreeItem>

                    <TreeItem nodeId="25" label="User">
                        <Link to="/admin/users">
                            <TreeItem nodeId="23" label="Users" icon={<VerifiedUser />} />
                        </Link>
                    </TreeItem>
                    <TreeItem nodeId="35" label="Collection">
                        <Link to="/admin/todo/new">
                            <TreeItem nodeId="37" label="Add" icon={<Add />} />
                        </Link>
                        <Link to="/admin/todos">
                            <TreeItem nodeId="36" label="All" icon={<PostAdd />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>


        </div>
    );
};

export default Sidebar;