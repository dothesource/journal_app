export function createAsyncAction(name) {
  const caps = name.toUpperCase()
  const init_action = `FETCH_${caps}_INIT`
  const success_action = `FETCH_${caps}_SUCCESS`
  const failure_action = `FETCH_${caps}_FAILURE`
  return {
    init_action,
    success_action,
    failure_action,
    init: () => ({
      type: init_action
    }),
    success: payload => ({
      type: success_action,
      payload
    }),
    failure: error => ({
      type: failure_action,
      error
    })
  }
}

export function createActionFunction(name) {
  return (payload, dispatch) => {
    dispatch({
      type: name,
      payload
    })
  }
}
