// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router, Link, Route, Switch
} from 'react-router-dom'
import {
  MovieDetails,
  AddMovie,
  Home,
  EditMovie,
  Favorite
} from './pages/index'
import { ApolloProvider } from '@apollo/client'
import client from './config/graphql'

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <nav className="navbar navbar-expand navbar-dark bg-dark" style={{ marginBottom: '1em' }}>
            <span className="navbar-brand">Entertain-me</span>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/add-movie'>Add Movie</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/favorite'>Favorite</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/add-movie">
              <AddMovie />
            </Route>
            <Route path="/movie/:id">
              <MovieDetails />
            </Route>
            <Route path="/edit-movie/:id">
              <EditMovie />
            </Route>
            <Route path="/favorite">
              <Favorite />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
