import React, { useEffect, useRef } from 'react'
import '../../App.css'
import api from '../../utils/api'
import '@material/elevation/dist/mdc.elevation.css'
import Day from '../../components/Day'
import { Store } from '../../store'
import {
  archivedInitDays,
  archivedDaysSuccess,
  archivedDaysFailure,
  initDelete,
  deleteSuccess,
  deleteFailure,
  initUpdateArchived,
  updateArchivedSuccess,
  updateArchivedFailure,
  initUnArchive,
  unArchiveSuccess,
  unArchiveFailure
} from '../../store/stores/archived'

const Archived = () => {
  const pageEndRef = useRef()
  const {
    state: { archived: archivedEntriesDays },
    dispatch
  } = React.useContext(Store)
  const getArchivedEntriesDays = async () => {
    dispatch(archivedInitDays())
    api
      .getArchivedDays()
      .then(days => {
        dispatch(archivedDaysSuccess(days))
        pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
      })
      .catch(e => dispatch(archivedDaysFailure(e)))
  }

  useEffect(() => {
    getArchivedEntriesDays()
  }, [])

  const deleteEntry = entry => {
    dispatch(initDelete())
    api
      .deleteEntry(entry)
      .then(day => {
        dispatch(deleteSuccess(day))
      })
      .catch(e => dispatch(deleteFailure(e)))
  }

  const updateEntryText = async (entry, text) => {
    dispatch(initUpdateArchived())
    api
      .updateArchivedEntry(entry, text)
      .then(entry => {
        dispatch(updateArchivedSuccess({ entry, text }))
      })
      .catch(e => dispatch(updateArchivedFailure(e)))
  }

  const unarchiveEntry = entry => {
    dispatch(initUnArchive())
    api
      .unArchiveEntry(entry)
      .then(day => {
        dispatch(unArchiveSuccess(day))
      })
      .catch(e => unArchiveFailure(e))
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
