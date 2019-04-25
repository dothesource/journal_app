import React, { useContext } from 'react'
import { Store } from '../store'
import { OPEN_DRAWER } from '../store/reducers/drawer'

const AppBar = ({ actions = [], title }) => {
  const { dispatch } = useContext(Store)

  return (
    <div className="app-bar mdc-elevation--z4">
      <i
        onClick={() => dispatch({ type: OPEN_DRAWER })}
        className="app-bar-icon material-icons"
      >
        menu
      </i>
      <div className="app-bar-title">{title}</div>
      <div>
        {actions.map(({ onClick, iconName }, i) => (
          <i
            key={i + iconName}
            onClick={onClick}
            className="app-bar-icon material-icons"
          >
            {iconName}
          </i>
        ))}
      </div>
    </div>
  )
}

export default AppBar
