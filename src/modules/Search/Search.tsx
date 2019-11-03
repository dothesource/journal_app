import React, { useState, useEffect, FunctionComponent } from 'react'
import AppBar from '../../components/AppBar'
import Container from '../../components/Container'
import Entry from '../../components/Entry'
import styled from 'styled-components'
import Elevated from '../../components/Elevated'
import MaterialIcon from '../../components/MaterialIcon'
import useDebounce from '../../utils/use_debounce'
// import api from '../../utils/api'
import { navigate } from '@reach/router'
import { IEntry } from '../../interfaces/IEntry'
import { RouterProps } from '../../interfaces/IRouter'

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

// const entries = [{ id: 1, text: 'a' }, { id: 2, text: 'b' }]
const Search: FunctionComponent<RouterProps> = () => {
  const [entries, setEntries] = useState<IEntry[]>([])
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  const queryOnChange = (e: any) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    //   api.searchEntries(debouncedQuery).then(result => {
    //     setEntries(result)
    //   })
  }, [debouncedQuery])

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
