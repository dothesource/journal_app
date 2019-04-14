import React, { useEffect, useRef, useContext } from 'react'
import '../../App.css'
import api from '../../utils/api'
import '@material/elevation/dist/mdc.elevation.css'
import Day from '../../components/Day'
import { Store } from '../../store'
import {
  archivedDaysActions,
  deleteActions,
  updateArchivedActions,
  unArchiveActions
} from '../../store/reducers/archived'

const Archived = () => {
  const pageEndRef = useRef()
  const {
    state: { archived: archivedEntriesDays },
    dispatch
  } = useContext(Store)
  const getArchivedEntriesDays = async () => {
    dispatch(archivedDaysActions.init())
    api
      .getArchivedDays()
      .then(days => {
        dispatch(archivedDaysActions.success(days))
        pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
      })
      .catch(e => dispatch(archivedDaysActions.failure(e)))
  }

  useEffect(() => {
    getArchivedEntriesDays()
  }, [])

  const deleteEntry = entry => {
    dispatch(deleteActions.init())
    api
      .deleteEntry(entry)
      .then(day => {
        dispatch(deleteActions.success(day))
      })
      .catch(e => dispatch(deleteActions.failure(e)))
  }

  const updateEntryText = async (entry, text) => {
    dispatch(updateArchivedActions.init())
    api
      .updateArchivedEntry(entry, text)
      .then(entry => {
        dispatch(updateArchivedActions.success({ entry, text }))
      })
      .catch(e => dispatch(updateArchivedActions.failure(e)))
  }

  const unarchiveEntry = entry => {
    dispatch(unArchiveActions.init())
    api
      .unArchiveEntry(entry)
      .then(day => {
        dispatch(unArchiveActions.success(day))
      })
      .catch(e => unArchiveActions.failure(e))
  }

  return (
    <div className="container">
      <div className="app-bar mdc-elevation--z4">
        <div className="app-bar-title">Archived</div>
      </div>
      {archivedEntriesDays.map(day => (
        <Day
          key={`day-${day.id}`}
          day={day}
          deleteEntry={deleteEntry}
          updateEntryText={updateEntryText}
          unarchiveEntry={unarchiveEntry}
        />
      ))}
      <div style={{ float: 'left', clear: 'both' }} ref={pageEndRef} />
    </div>
  )
}

export default Archived
