import React from 'react'
import styled from 'styled-components'

const SideBarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: ${({ visible, width }) => (visible ? '0' : '-' + width + 'px')};
  bottom: 0;
  width: ${({ width }) => width + 'px'};
  background-color: white;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  transition: all 0.6s;
  z-index: 100;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${props => (props.visible ? '100%' : '0')};
  background-color: ${props =>
    props.visible ? 'rgba(10, 10, 10, 0.3)' : 'rgba(10, 10, 10, 0)'};
  z-index: 99;
`

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

const SideBar = ({
  visible,
  setVisible,
  children,
  sidebarContent,
  className,
  width = 300
}) => {
  return (
    <div>
      <Container
        onClick={e => {
          if (visible) {
            e.stopPropagation()
          }
        }}
      >
        <SideBarContainer width={width} visible={visible} className={className}>
          {sidebarContent}
        </SideBarContainer>

        <div>{children}</div>
      </Container>
      <Overlay
        visible={visible}
        onClick={e => {
          if (visible) {
            setVisible(false)
            e.stopPropagation()
          }
        }}
      />
    </div>
  )
}

export default SideBar
