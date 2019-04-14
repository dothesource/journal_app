import * as day from './days'
import * as archived from './archived'
export * from './api'

const api = {
  ...day,
  ...archived
}

export default api
