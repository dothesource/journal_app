import React, { useContext } from 'react'
import Drawer from 'react-motion-drawer'
import { Store } from '../store'
import { CLOSE_DRAWER } from '../store/reducers/drawer'
import { navigate } from '@reach/router'
import styled from 'styled-components'
import MaterialIcon from './MaterialIcon'

const DrawerNavigator = styled(Drawer)`
  background-color: white;
`

const DrawerContent = styled.div`
  padding: 16px;
`

const DrawerHeader = styled.h3`
  font-size: 20px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;
`

const DrawerIcon = styled(MaterialIcon)`
  padding: 16px 32px 16px 0px;
`

const DrawerItem = ({ iconName, title, path, dispatch }) => {
  return (
    <Item
      onClick={() => {
        dispatch({ type: CLOSE_DRAWER })
        navigate(path)
      }}
    >
      <DrawerIcon>{iconName}</DrawerIcon>
      <span>{title}</span>
    </Item>
  )
}

const routes = [
  {
    icon: 'home',
    text: 'Home',
    path: '/'
  },
  { icon: 'archive', text: 'Archived', path: '/archived' },
  { icon: 'search', text: 'Search', path: '/search' }
]

const DrawerNav = () => {
  const {
    state: { drawerOpen },
    dispatch
  } = useContext(Store)

  const drawerOnChange = thing => {
    if (drawerOpen === true) dispatch({ type: CLOSE_DRAWER })
  }

  return (
    <DrawerNavigator open={drawerOpen} onChange={drawerOnChange}>
      <DrawerContent>
        <DrawerHeader>Journal</DrawerHeader>
        {routes.map(({ icon, text, path }) => (
          <DrawerItem
            key={path + text}
            path={path}
            iconName={icon}
            title={text}
            dispatch={dispatch}
          />
        ))}
      </DrawerContent>
    </DrawerNavigator>
  )
}
export default DrawerNav
