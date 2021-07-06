import React, { Component } from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Users from './Components/Users1'
import Contact from './Components/Contact'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/users"><Users /></Route>
          <Route exact path="/contactus"><Contact /></Route>
        </Switch>
        <Footer />
      </Router>
    )
  }
}

export default App