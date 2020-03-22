import { createStore, compose, applyMiddleware } from 'redux'; //applyMiddleware来引入redux中间件 保证可使用中间件
import reducer from './reducer.js';
import thunk from 'redux-thunk'; //redux-thunk中间件统一管理异步请求和其他复杂逻辑
//有了thunk， action就可以是一个函数了（在函数里些ajax等异步请求） 否则必须是一个对象 包含type 和 组件通信的数据

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(
					reducer, 
					enhancer
					);

export default store;