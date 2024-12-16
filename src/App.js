import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Popular from './components/Popular'
import SearchQuery from './components/SearchQuery'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'

import SearchMoviesContext from './context/SearchMoviesContext'

import './App.css'

const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'

class App extends Component {
  state = {searchInput: '', apiStatus: 'INITIAL', searchResponse: {}}

  getUpdatedData = data => ({
    totalPages: data.total_pages,
    totalResults: data.total_results,
    results: data.results.map(each => ({
      id: each.id,
      posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
      voteAverage: each.vote_average,
      title: each.title,
    })),
  })

  onTriggerSearchingQuery = async (page = 1) => {
    const {searchInput} = this.state
    this.setState({apiStatus: 'IN_PROGRESS'})
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    const searchData = this.getUpdatedData(data)
    this.setState({apiStatus: 'SUCCESS', searchResponse: searchData})
  }

  onChangeSearchInput = text => {
    this.setState({searchInput: text})
  }

  render() {
    const {searchResponse, apiStatus, searchInput} = this.state
    return (
      <SearchMoviesContext.Provider
        value={{
          searchInput,
          onChangeSearchInput: this.onChangeSearchInput,
          apiStatus,
          searchResponse,
          onTriggerSearchingQuery: this.onTriggerSearchingQuery,
        }}
      >
        <div className="app">
          <Switch>
            <Route exact path="/" component={Popular} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/upcoming" component={Upcoming} />
            <Route exact path="/search" component={SearchQuery} />
          </Switch>
        </div>
      </SearchMoviesContext.Provider>
    )
  }
}
export default App

/*
import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SearchQuery from './components/SearchQuery'

import SearchMoviesContext from './context/SearchMoviesContext'

import './App.css'

const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'

// write your code here
const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const onTriggerSearchingQuery = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`

    const response = await fetch(apiUrl)
    const data = await response.json()
    setSearchResponse(getUpdatedData(data))
    setApiStatus('SUCCESS')
  }

  return (
    <SearchMoviesContext.Provider
      value={{
        searchResponse,
        apiStatus,
        onTriggerSearchingQuery,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <div className="App d-flex flex-column">
        <Switch>
          <Route exact path="/" component={Popular} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/search" component={SearchQuery} />
        </Switch>
      </div>
    </SearchMoviesContext.Provider>
  )
}

export default App
*/
