import { createStore, applyMiddleware, compose } from 'redux';

import reducers from '../reducers/index';


import { persistStore, persistReducer } from 'redux-persist' 
import storage from 'redux-persist/lib/storage';

import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Enhancers = composeEnhancers(applyMiddleware( thunk ));


const persistConfig = {
    key: 'root',
    //version: 0,     // let assign the current version to 0
    //debug: true,    // debug persistor
    storage:storage
    //stateReconciler: autoMergeLevel2
}
const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer, Enhancers)
let persistor = persistStore(store)

export { store, persistor };