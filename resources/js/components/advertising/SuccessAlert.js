import React, { Component } from 'react';

export default class SuccessAlert extends Component{
    render(){
    return (
        <div className="alert alert-success" role="alert">
            <strong> Congratulations</strong> You have successfully added the record.
        </div>
    );
}
}
