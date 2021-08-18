import {createStore, applyMiddleware,compose} from 'redux'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = compose;
// 禁用redux调试环境
// const composeEnhancers = compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
);
const store = createStore(reducer, enhancer);
sagaMiddleware.run(mySaga);

export default store;
