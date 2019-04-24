import React from 'react'

const AppBar = ({ actions = [], title }) => {
  return (
    <div className="app-bar mdc-elevation--z4">
      <div className="app-bar-title">{title}</div>
      <div>
        {actions.map(({ onClick, iconName }) => (
          <i onClick={onClick} className="app-bar-icon material-icons">
            {iconName}
          </i>
        ))}
      </div>
    </div>
  )
}

export default AppBar
