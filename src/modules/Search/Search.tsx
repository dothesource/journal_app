import React, {
  useState,
  useEffect,
  FunctionComponent,
  useContext
} from 'react'
import AppBar from '../../components/AppBar'
import Container from '../../components/Container'
import Entry from '../../components/Entry'
import styled from 'styled-components'
import Elevated from '../../components/Elevated'
import MaterialIcon from '../../components/MaterialIcon'
// import useDebounce from '../../utils/use_debounce'
// import api from '../../utils/api'
import { navigate } from '@reach/router'
import { IEntry } from '../../interfaces/IEntry'
import { RouterProps } from '../../interfaces/IRouter'
import { Store } from '../../store'
import { IDay } from '../../interfaces/IDay'

const SearchBar = styled(Elevated)`
  height: 24px;
  width: 100%;
  margin: 16px 0;
  padding: 16px 0;
  display: flex;
  align-items: center;
  border-radius: 4px;
`

const SearchIcon = styled(MaterialIcon)`
  margin: 0 16px;
`
const SearchInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
`

const Search: FunctionComponent<RouterProps> = () => {
  const {
    state: { days }
    // dispatch
  } = useContext(Store)
  const [query, setQuery] = useState('')

  const [entries, setEntries] = useState<IEntry[]>([])

  const queryOnChange = (e: any) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    const filteredEntries = days.reduce((prev: IEntry[], d: IDay) => {
      const filtered = d.entries.filter(
        e =>
          !e.archived_at &&
          (!query || e.text.toLowerCase().includes(query.toLowerCase()))
      )
      return [...prev, ...filtered]
    }, [])

    setEntries(filteredEntries)
  }, [days, query])

  return (
    <div>
      <AppBar title="search" />
      <Container>
        <SearchBar>
          <SearchIcon>search</SearchIcon>
          <SearchInput
            placeholder="search for entries"
            onChange={queryOnChange}
          />
        </SearchBar>
        {entries.map((e: IEntry) => (
          <Entry
            entry={e}
            key={e.id}
            noActions
            entryOnClick={() => navigate(`/day/${e.day_id}`)}
          />
        ))}
      </Container>
    </div>
  )
}

export default Search
