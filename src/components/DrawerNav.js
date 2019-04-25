import React, { useContext } from 'react'
import Drawer from 'react-motion-drawer'
import { Store } from '../store'
import { CLOSE_DRAWER } from '../store/reducers/drawer'
import { navigate } from '@reach/router'

const DrawerNav = () => {
  const {
    state: { drawerOpen },
    dispatch
  } = useContext(Store)

  return (
    <Drawer
      open={drawerOpen}
      onChange={() => {
        if (drawerOpen === true) dispatch({ type: CLOSE_DRAWER })
      }}
      drawerStyle={{ backgroundColor: 'white' }}
    >
      <div style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '20px' }}>Journal</h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            cursor: 'pointer'
          }}
          onClick={() => {
            dispatch({ type: CLOSE_DRAWER })
            navigate('/')
          }}
        >
          <i
            className="material-icons"
            style={{ padding: '16px 32px 16px 0px' }}
          >
            home
          </i>
          <span>Home</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            cursor: 'pointer'
          }}
          onClick={() => {
            dispatch({ type: CLOSE_DRAWER })
            navigate('/archived')
          }}
        >
          <i
            className="material-icons"
            style={{ padding: '16px 32px 16px 0px' }}
          >
            archive
          </i>
          <span>Archived</span>
        </div>
      </div>
    </Drawer>
  )
}
export default DrawerNav
