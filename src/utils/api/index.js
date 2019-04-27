import * as day from './days'
import * as archived from './archived'
import * as search from './search'
export * from './api'

const api = {
  ...day,
  ...archived,
  ...search
}

export default api
