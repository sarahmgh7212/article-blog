import React,{Component} from 'react';
import { Link} from 'react-router-dom';

class NavBar extends Component {
    render() {
      return (
          <nav>
          <ul>
              <li>
                  <Link to="/" >Home</Link>
                    
              </li>
              <li>
                  <Link to="/about">About</Link>
                    
              </li>
              <li>
                  <Link to="/article-list">Article List</Link>
                    
              </li>
          </ul>
          </nav>
      );
    }
  }
    export default NavBar;