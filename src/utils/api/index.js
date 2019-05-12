import * as day from './days'
import * as archived from './archived'
import * as search from './search'
import * as registration from './registration'
export * from './api'

const api = {
  ...day,
  ...archived,
  ...search,
  ...registration
}

export default api
