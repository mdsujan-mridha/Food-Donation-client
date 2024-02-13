import React, { Fragment, useEffect } from 'react';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, deleteProduct, getAdminProduct } from '../../action/productAction';
import { toast } from 'react-toastify';
import { DELETE_PRODUCT_RESET } from '../../constant/productConstant';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import "./userList.css";
const ProductList = () => {

    const dispatch = useDispatch();
    const { error, products } = useSelector((state) => state.products);
    // console.log(products);
    //  delete product 
    const { error: deleteError, isDeleted } = useSelector((state) => state.product);

    const navigate = useNavigate()

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
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
            toast.success("Product deleted successfully")
            navigate("/admin/dashboard")
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        dispatch(getAdminProduct())
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
            field: "stock",
            headerName: "Quantity",
            type: "number",
            minWidth: 150,
            flex: 0.3,
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
                        <Link to={`/admin/product/${params.row.id}`}>
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
    products &&
        products.forEach((item) => {
            rows.push({
                id: item?._id,
                stock: item?.Stock ? item.Stock : item?.quantity,
                name: item?.productName ? item.productName : item?.name,
            })
        })
    return (
        <Fragment>
            <MetaData title={`ALL Products - Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>
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

export default ProductList;