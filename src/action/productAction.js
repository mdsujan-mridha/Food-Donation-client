import axios from "axios";
import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    CLEAR_ERRORS,



} from "../constant/productConstant";




// get single products details 
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`http://localhost:5000/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            // if i get product Which in need then set it on payload 
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error?.error?.response?.data?.message,
        });
    }
};



// get all product by admin  
export const getAdminProduct = () => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST })
        const { data } = await axios.get(`http://localhost:5000/api/v1/admin/products`)
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }

}


// delete product by admin 
export const deleteProduct = (id) => async (dispatch) => {

    try {

        dispatch({
            type: DELETE_PRODUCT_REQUEST
        })
        const { data } = await axios.delete(`http://localhost:5000/api/v1/admin/product/${id}`)
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }

}
// create new product by admin 
export const createProduct = (productData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_PRODUCT_REQUEST })
        //   const config = {
        //     headers:{
        //         "Content-type":"application/json"
        //     }
        //   }
        const data = await axios.post(`http://localhost:5000/api/v1/admin/product/new`, productData)
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response?.data.message
        })
    }

}
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })
        const { data } = await axios.put(`http://localhost:5000/api/v1/admin/product/${id}`, productData)
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


// clear error 
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}