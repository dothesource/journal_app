import React, { useEffect, useRef, useContext, FunctionComponent } from 'react'
// import api from '../../utils/api'
import Day from '../../components/Day'
import { Store } from '../../store'
// import {
//   archivedDaysActions,
//   deleteActions,
//   updateArchivedActions,
//   unArchiveActions
// } from '../../store/reducers/archived'
import AppBar from '../../components/AppBar'
import Container from '../../components/Container'
import { IEntry } from '../../interfaces/IEntry'
import { IDay } from '../../interfaces/IDay'
import { RouterProps } from '../../interfaces/IRouter'

const Archived: FunctionComponent<RouterProps> = () => {
  const pageEndRef = useRef<HTMLDivElement>(null)
  const {
    state: { archived: archivedEntriesDays },
    dispatch
  } = useContext(Store)

  useEffect(() => {
    // const getArchivedEntriesDays = async () => {
    //   dispatch(archivedDaysActions.init())
    //   api
    //     .getArchivedDays()
    //     .then(days => {
    //       dispatch(archivedDaysActions.success(days))
    //       if(pageEndRef) pageEndRef.current!.scrollIntoView({ behavior: 'smooth' })
    //     })
    //     .catch(e => dispatch(archivedDaysActions.failure(e)))
    // }
    // getArchivedEntriesDays()
  }, [dispatch])

  const deleteEntry = (entry: IEntry) => {
    // dispatch(deleteActions.init())
    // api
    //   .deleteEntry(entry)
    //   .then(day => {
    //     dispatch(deleteActions.success(day))
    //   })
    //   .catch(e => dispatch(deleteActions.failure(e)))
  }

  const updateEntryText = async (entry: IEntry, text: string) => {
    // dispatch(updateArchivedActions.init())
    // api
    //   .updateArchivedEntry(entry, text)
    //   .then(entry => {
    //     dispatch(updateArchivedActions.success({ entry, text }))
    //   })
    //   .catch(e => dispatch(updateArchivedActions.failure(e)))
  }

  const unarchiveEntry = (entry: IEntry) => {
    // dispatch(unArchiveActions.init())
    // api
    //   .unArchiveEntry(entry)
    //   .then(day => {
    //     dispatch(unArchiveActions.success(day))
    //   })
    //   .catch(e => unArchiveActions.failure(e))
  }

  return (
    <div>
      <AppBar title="Archived" />
      <Container>
        {archivedEntriesDays.map((day: IDay) => (
          <Day
            key={`day-${day.id}`}
            day={day}
            deleteEntry={deleteEntry}
            updateEntryText={updateEntryText}
            unarchiveEntry={unarchiveEntry}
          />
        ))}
        <div style={{ float: 'left', clear: 'both' }} ref={pageEndRef} />
      </Container>
    </div>
  )
}

export default Archived
