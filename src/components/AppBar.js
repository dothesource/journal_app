import React, { useContext } from 'react'
import { Store } from '../store'
import { OPEN_DRAWER } from '../store/reducers/drawer'
import styled from 'styled-components'
import Elevated from './Elevated'
import MaterialIcon from './MaterialIcon'

const AppBarContainer = styled(Elevated)`
  display: flex;
  height: 56px;
  background-color: #282c34;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

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

  const openDrawer = () => dispatch({ type: OPEN_DRAWER })

  return (
    <AppBarContainer>
      <AppBarIcon onClick={openDrawer}>menu</AppBarIcon>
      <AppBarTitle>{title}</AppBarTitle>
      <div>
        {actions.map(({ onClick, iconName }, i) => (
          <AppBarIcon key={i + iconName} onClick={onClick}>
            {iconName}
          </AppBarIcon>
        ))}
      </div>
    </AppBarContainer>
  )
}

export default AppBar
