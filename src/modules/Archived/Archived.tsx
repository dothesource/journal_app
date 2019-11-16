import React, { useEffect, useRef, useContext, FunctionComponent } from 'react'
// import api from '../../utils/api'
import Day from '../../components/Day'
import { Store } from '../../store'
import AppBar from '../../components/AppBar'
import Container from '../../components/Container'
import { IEntry } from '../../interfaces/IEntry'
import { IDay } from '../../interfaces/IDay'
import { RouterProps } from '../../interfaces/IRouter'
import { arrayIsValid } from '../../utils/generic'
import { actionDeleteEntry } from '../../store/reducers/days'

const Archived: FunctionComponent<RouterProps> = () => {
  const pageEndRef = useRef<HTMLDivElement>(null)
  const { state, dispatch } = useContext(Store)

  const days: IDay[] = state.days
  const archivedEntriesDays = arrayIsValid(days)
    ? days.filter(d => d.entries.some(e => e.archived_at !== undefined))
    : []

  // TODO: see if its possible to use memo here somehow
  //  useMemo(() => {
  //   if (arrayIsValid(days))
  //     return days.filter(d => d.entries.some(e => e.archived_at !== undefined))
  //   else return []
  // }, [days])

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
    actionDeleteEntry(entry, dispatch)
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
            showArchived={true}
          />
        ))}
        <div style={{ float: 'left', clear: 'both' }} ref={pageEndRef} />
      </Container>
    </div>
  )
}

export default Archived
