import React, {
  FunctionComponent,
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback
} from 'react'
// import api from '../../utils/api'
import { last } from '../../utils/generic'
import useKeyPress from '../../utils/use_key_press'
import { Store } from '../../store'
import Loader from 'react-loader-spinner'
import { actionAddEntry, actionUpdateEntry } from '../../store/reducers/days'
import DayList from './DayList'
import AppBar from '../../components/AppBar'
import Container from '../../components/Container'
import styled from 'styled-components'
import Footer from './Footer'

import { IEntry } from '../../interfaces/IEntry'
import { RouterProps } from '../../interfaces/IRouter'

const NEW_ENTRY_DELAY = 5 * 60 * 1000

const SelfCentered = styled.div`
  align-self: center;
`

// const attachDispatchToAction = (
//   actionFunction: Function,
//   dispatch: Function
// ) => (payload: any) => actionFunction(payload, dispatch)

const Days: FunctionComponent<RouterProps> = () => {
  const {
    state: { days, daysLoading },
    dispatch
  } = useContext(Store)
  const pageEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const [shouldCreateNewEntry, setShouldCreateNewEntry] = useState(true)
  const [currentEntry, setCurrentEntry] = useState('')

  // const dispatchAddEntry = attachDispatchToAction(actionAddEntry, dispatch)
  // const dispatchUpdateEntry = attachDispatchToAction(
  //   actionUpdateEntry,
  //   dispatch
  // )
  // const dispatchArchiveEntry = attachDispatchToAction(
  //   actionArchiveEntry,
  //   dispatch
  // )

  const handleInputChange = (event: any) => {
    setCurrentEntry(event.target.value)
  }

  const saveEntry = () => {
    actionAddEntry(currentEntry, dispatch)
    setCurrentEntry('')
    if (inputRef) inputRef.current!.focus()
    else console.log('no input ref')
    if (pageEndRef) pageEndRef.current!.scrollIntoView({ behavior: 'smooth' })
    else console.log('no page end ref')
    setShouldCreateNewEntry(false)
  }

  const updateEntryText = (entry: IEntry, text: string) => {
    actionUpdateEntry({ entry, text }, dispatch)
  }

  const archiveEntry = (entry: IEntry) => {
    // dispatch(archiveActions.init())
    // api
    //   .archiveEntry(entry)
    //   .then(day => {
    // dispatchArchiveEntry(entry)
    // const last_day = last(days)
    // const last_entry = !!last_day ? last(last_day.entries) : undefined
    // if (last_entry !== undefined && entry.id === last_entry.id) {
    //   setShouldCreateNewEntry(true)
    // }
    // })
    // .catch(e => dispatch(archiveActions.failure(e)))
  }

  // useEffect(() => {
  //   const getDays = async () => {
  //     dispatch(daysActions.init())
  //     api
  //       .getDays()
  //       .then(days => {
  //         dispatch(daysActions.success(days))
  //         pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  //       })
  //       .catch(e => dispatch(daysActions.failure(e)))
  //   }
  //   getDays()
  // }, [dispatch])

  const updatePreviousEntry = () => {
    const lastDay = last(days)
    if (lastDay !== undefined) {
      const recentDayEntries = lastDay.entries
      const recentEntry = last(recentDayEntries)
      if (recentEntry !== undefined) {
        updateEntryText(recentEntry, `${recentEntry.text}\n${currentEntry}`)
        setCurrentEntry('')
        if (inputRef) inputRef.current!.focus()
        if (pageEndRef)
          pageEndRef.current!.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    saveEntry()
  }

  const timeOutRef = useRef<any>(null)
  const delayNewEntry = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }
    timeOutRef.current = setTimeout(() => {
      setShouldCreateNewEntry(true)
    }, NEW_ENTRY_DELAY)
  }

  useEffect(() => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current)
      }
    }
  }, [])

  const shiftPressed = useKeyPress('Shift')

  const saveEntryToPrev = () => {
    if (shouldCreateNewEntry === true || shiftPressed) {
      saveEntry()
    } else {
      updatePreviousEntry()
    }
  }

  const _handleKeyPress = (e: any) => {
    if (shouldCreateNewEntry === false) {
      setShouldCreateNewEntry(false)
      delayNewEntry()
    }
    if (e.key === 'Enter' && focused) {
      saveEntryToPrev()
    }
  }

  const [focused, setFocused] = useState(false)
  const onFocus = () => {
    setFocused(true)
  }
  const onBlur = () => {
    setFocused(false)
  }

  const addEmptyEntry = () => {
    saveEntry()
    if (pageEndRef.current)
      pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const updateEntryTextCallback = useCallback((entry: IEntry, text: string) => {
    updateEntryText(entry, text)
  }, [])

  return (
    <div>
      <AppBar
        title="Entries"
        actions={[{ onClick: addEmptyEntry, iconName: 'add' }]}
      />
      <Container>
        {daysLoading ? (
          <SelfCentered>
            <Loader type="ThreeDots" color="#282c34" height="100" width="100" />
          </SelfCentered>
        ) : (
          <DayList
            days={days}
            updateEntryText={updateEntryTextCallback}
            archiveEntry={archiveEntry}
          />
        )}

        <div style={{ float: 'left', clear: 'both' }} ref={pageEndRef} />
        <Footer
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          handleInputChange={handleInputChange}
          handleKeyPress={_handleKeyPress}
          currentEntry={currentEntry}
          saveEntry={saveEntryToPrev}
        />
      </Container>
    </div>
  )
}

export default Days
