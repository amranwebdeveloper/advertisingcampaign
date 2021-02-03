import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link, Route} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Advertising from './advertising/Index';
import Add from "./advertising/Add";
import Edit from "./advertising/Edit";
export default class Header extends Component{
    render(){

    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/advertising">Advertising</Link>
                    </li>
                </ul>
            </div>
        </nav>
        <div className='row'>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/advertising' component={Advertising} />
            <Route exact path='/advertising/add' component={Advertising} />
            <Route exact path='/advertising/edit/:id' component={Advertising} />
         </div>
        </div>
    );
    }
}

