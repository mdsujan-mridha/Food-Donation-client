
import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import { newProductReducer, productDetailsReducer, productReducer, productsReducer } from "./reducer/productReducer";
import { allUserReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducer/userReducer";
import { newTodoReducer, todoDetailsReducer, todoReducer, todosReducer } from "./reducer/todoReducer";



const reducer = combineReducers({
    // get all products  
    products: productsReducer,
    // get single products details 
    productDetails: productDetailsReducer,
    // user reducer 
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    // product:productsReducer,
    product: productReducer,
    newProduct: newProductReducer,
    // all orders for admin 
    allUsers: allUserReducer,
    userDetails: userDetailsReducer,
    todos: todosReducer,
    todoDetails: todoDetailsReducer,
    newTodo: newTodoReducer,
    todo: todoReducer,

});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store;