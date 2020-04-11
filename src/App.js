import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,Switch,Link

}from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import AboutPage from './pages/AboutPage';
import NavBar from './NavBar';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';


class App extends Component{
  render(){
    return (
      // <Router>
      //    <div className="App">
      //   <Route path="/" Component={HomePage} />
      // </div>
      // </Router>
      <Router>
        <div className="App nav">
         <NavBar/>
         <div id="page-body">
         
          <Switch>
              <Route  exact path='/' component={HomePage} />
              <Route  path='/about' component={AboutPage} />
              <Route  path='/article-list' component={ArticleListPage} />
              <Route  path='/article/:name' component={ArticlePage} />
              <Route component={NotFoundPage} />
             
          </Switch>
          </div>
        </div>
      </Router>
     
    );
  }
}

export default App;
