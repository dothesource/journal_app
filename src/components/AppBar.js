import React, { useContext } from 'react'
import { Store } from '../store'
import { OPEN_DRAWER } from '../store/reducers/drawer'
import styled from 'styled-components'
import MaterialIcon from './MaterialIcon'
import Headroom from 'react-headroom'

const headRoomStyles = {
  boxShadow:
    '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  height: '56px',
  backgroundColor: '#282c34',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row'
}

const AppBarIcon = styled(MaterialIcon)`
  color: white;
  padding: 16px;
  cursor: pointer;
`

const AppBarTitle = styled.div`
  margin-left: 16px;
  color: white;
  flex: 1;
`

const AppBar = ({ actions = [], title }) => {
  const { dispatch } = useContext(Store)

  const openDrawer = () => {
    dispatch({ type: OPEN_DRAWER })
  }

  return (
    <Headroom style={headRoomStyles}>
      <AppBarIcon onClick={openDrawer}>menu</AppBarIcon>
      <AppBarTitle>{title}</AppBarTitle>
      <div>
        {actions.map(({ onClick, iconName }, i) => (
          <AppBarIcon key={i + iconName} onClick={onClick}>
            {iconName}
          </AppBarIcon>
        ))}
      </div>
    </Headroom>
  )
}

export default AppBar
