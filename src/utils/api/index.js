import * as day from './days'
import * as archived from './archived'
import * as search from './search'
import * as authentication from './authentication'
export * from './api'

const api = {
  ...day,
  ...archived,
  ...search,
  ...authentication
}

export default api
