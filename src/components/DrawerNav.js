import React, { useContext } from 'react'
// import Drawer from 'react-motion-drawer'
import { default as Drawer } from './SideBar'
import { Store } from '../store'
import {
  CLOSE_DRAWER,
  NAVIGATE_TO,
  OPEN_DRAWER
} from '../store/reducers/drawer'
import { navigate } from '@reach/router'
import styled from 'styled-components'
import MaterialIcon from './MaterialIcon'

const DrawerNavigator = styled(Drawer)`
  background-color: white;
`

const DrawerContent = styled.div`
  padding: 16px 0px;
`

const DrawerHeader = styled.h3`
  font-size: 20px;
  margin-left: 16px;
  margin-bottom: 0px;
`
const DrawerSubHeader = styled.h4`
  color: #0000008a;
  font-size: 13px;
  margin-left: 16px;
  margin-bottom: 18px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin: 8px 4px;
  padding-left: 12px;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#282c34' : 'white')};
  color: ${props => (props.selected ? 'white' : '#282c34')};
  border-radius: 8px;
  height: 48px;
`

const DrawerIcon = styled(MaterialIcon)`
  padding: 8px 32px 8px 0px;
`

const DrawerItem = ({ iconName, title, path, dispatch, selected }) => {
  return (
    <Item
      onClick={() => {
        dispatch({ type: NAVIGATE_TO, path })
        navigate(path)
      }}
      selected={selected}
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

const DrawerNav = ({ children }) => {
  const {
    state: { drawerOpen, path: currentPath },
    dispatch
  } = useContext(Store)

  const drawerOnChange = () => {
    if (drawerOpen === true) dispatch({ type: CLOSE_DRAWER })
  }

  const setDrawer = open => {
    if (open) {
      dispatch({ type: OPEN_DRAWER })
    } else {
      dispatch({ type: CLOSE_DRAWER })
    }
  }

  return (
    <DrawerNavigator
      // onClick={e => e.stopPropagation()}
      visible={drawerOpen}
      setVisible={setDrawer}
      sidebarContent={<Content dispatch={dispatch} currentPath={currentPath} />}
    >
      {children}
    </DrawerNavigator>
  )
}

const Content = ({ dispatch, currentPath }) => (
  <DrawerContent>
    <DrawerHeader>Journal</DrawerHeader>
    <DrawerSubHeader>Navigate</DrawerSubHeader>
    {routes.map(({ icon, text, path }) => (
      <DrawerItem
        key={path + text}
        path={path}
        iconName={icon}
        title={text}
        dispatch={dispatch}
        selected={path === currentPath}
      />
    ))}
  </DrawerContent>
)

export default DrawerNav
