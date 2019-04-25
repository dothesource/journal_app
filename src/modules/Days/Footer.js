import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import styled from 'styled-components'
import MaterialIcon from '../../components/MaterialIcon'
import Elevated from '../../components/Elevated'

function FooterBar(
  {
    onFocus,
    onBlur,
    handleInputChange,
    handleKeyPress,
    currentEntry,
    saveEntry
  },
  ref
) {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))
  return (
    <Footer>
      <FooterInput
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        type="text"
        placeholder="Add an entry..."
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        value={currentEntry}
      />
      <Icon onClick={saveEntry}>send</Icon>
    </Footer>
  )
}

export default forwardRef(FooterBar)

const Footer = styled(Elevated)`
  height: 56px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  align-items: center;
  display: flex;
`

const Icon = styled(MaterialIcon)`
  color: grey;
  padding: 16px;
  cursor: pointer;
`

const FooterInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  margin-left: 16px;
`
