import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { startingCellReducer } from './reducers/startCellReducer';
import { currentCellReducer } from './reducers/currentCellReducer';
import arrowsReducer from './reducers/arrowsReducer';

const reducers = combineReducers({
    startingCell: startingCellReducer,
    currentCell: currentCellReducer,
    arrows: arrowsReducer,
})

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || compose

export default createStore(
    reducers,
    composeEnhancers(applyMiddleware()));