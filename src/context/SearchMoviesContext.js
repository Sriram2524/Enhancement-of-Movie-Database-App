import React from 'react'

const SearchMoviesContext = React.createContext({
  searchResponse: {},
  onTriggerSearchingQuery: () => {},
})

export default SearchMoviesContext

/* import {createContext} from 'react'

const SearchMoviesContext = createContext({
  searchResponse: {},
  onTriggerSearchingQuery: () => {},
})

export default SearchMoviesContext
*/
