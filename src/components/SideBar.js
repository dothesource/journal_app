import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

const SideBarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: ${props => (props.visible ? '0' : '-300px')};
  bottom: 0;
  width: 300px;
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
  right: 0;
  pointer-events: none;
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
  className
}) => {
  useEffect(() => {
    clearAllBodyScrollLocks()
  }, [visible])

  const [identifier, setIdentifier] = useState(null)
  const [currentX, setCurrentX] = useState(null)
  const [startX, setStartX] = useState(null)
  const [isClicking, setIsClicking] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const isTouching = identifier !== null

  const onStart = ev => {
    if (!isTouching && !!ev.targetTouches && ev.targetTouches.length > 0) {
      const touch = ev.targetTouches[0]
      setIdentifier(touch.identifier)
      setStartX(touch.clientX)
      setCurrentX(touch.clientX)
    } else if (!isClicking) {
      setIsClicking(true)
      setStartX(ev.clientX)
      setCurrentX(ev.clientX)
    }
  }

  const onMove = ev => {
    if (isTouching && ev.targetTouches && ev.targetTouches.length > 0) {
      for (let ind = 0; ind < ev.targetTouches.length; ind++) {
        // we only care about the finger that we are tracking
        if (ev.targetTouches[ind].identifier === identifier) {
          setCurrentX(ev.targetTouches[ind].clientX)
          break
        }
      }
    } else if (isClicking) {
      setCurrentX(ev.clientX)
      setIsDragging(true)
    }
  }

  const onEnd = e => {
    const diff = startX != null ? currentX - startX : 0
    if (!visible && diff > 20) {
      setVisible(true)
    } else if (visible && diff < -20) {
      setVisible(false)
    }
    if (isTouching) {
      setIdentifier(null)
      setStartX(null)
      setCurrentX(null)
      setIsDragging(false)
    } else if (isClicking && isDragging) {
      setStartX(null)
      setCurrentX(null)
      setIsClicking(false)
      setIsDragging(false)
    }
  }

  const body = useRef(null)

  return (
    <div ref={body}>
      <Container
        onTouchStart={onStart}
        onMouseDown={onStart}
        onMouseMove={onMove}
        onTouchMove={onMove}
        onMouseUp={onEnd}
        onTouchEnd={onEnd}
      >
        <SideBarContainer
          onClick={e => e.stopPropagation()}
          visible={visible}
          className={className}
        >
          {sidebarContent}
        </SideBarContainer>
        <div
          onClick={e => {
            setVisible(false)
            e.stopPropagation()
          }}
          onTouchStart={ev => {
            if (visible && body) {
              disableBodyScroll(body.current)
            }
          }}
        >
          {children}
        </div>
      </Container>
      <Overlay visible={visible} />
    </div>
  )
}

export default SideBar
