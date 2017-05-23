export default function savePreloadedState({ getState }) {
  return next => action => {
    const returnValue = next(action);
    window.__PRELOADED_STATE__ = getState();

    return returnValue;
  };
}
