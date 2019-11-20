import React from 'react'
import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Index from './components/Index';
import NotFound from './components/NotFound';
import QuoteList from './components/QuoteList';
import QuoteForm from './components/QuoteForm';
import Navigation from './components/Navigation';
import QuoteDetails from './components/QuoteDetails';

function App () {
  return (
    <div className='App'>
      <Router>
        <Navigation/>
        <div className="MainContent">
      <Switch>
        <Route path='/' exact component={Index}/>
        <Route path='/quotes' exact component={QuoteList}/>
        <Route path='/quotes/:id' component={QuoteDetails}/>
        <Route path='/form' component={QuoteForm}/>
        <Route component={NotFound}/>
      </Switch>
      </div>
      </Router>
    </div>
  )
}

export default App
