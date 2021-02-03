import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Add from "./Add";
import Listing from "./Listing";
import Edit from "./Edit";
function Index() {
    return (
        <div>
                <Link to="/advertising" className="btn btn-primary btn-sm">Listing</Link>
                <Link to="/advertising/add" className="btn btn-success btn-sm">Add</Link>
                <Route exact path="/advertising" component={Listing} />
                <Route exact path="/advertising/add" component={Add} />
                <Route exact path="/advertising/edit/:id" component={Edit} />
        </div>
    );
}

export default Index;
