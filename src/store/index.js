import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios  from "axios";
import { rootReducer } from "./root-reducer";
import * as api from '../config';
const componeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, componeEnhancers(
  applyMiddleware(
    thunk.withExtraArgument({ //  данные ход позволит в action-ах третим параметром, помимо dispatch-ей и getState, доставать 
                              // эти две сущности (client и api)
      client: axios,
      api //== api: api 
    })
  )
));

export {store}