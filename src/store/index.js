import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "../redux";
import { watcherSaga } from "../sagas";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const storeConfig = () => {
  const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  let store = createStore(
    reducer,
    compose(
      applyMiddleware(sagaMiddleware),
      reduxDevTools,
      applyMiddleware(logger)
    )
  );
  sagaMiddleware.run(watcherSaga);
  return store;
};

export default storeConfig;
