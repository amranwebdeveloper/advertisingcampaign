import React, { Component } from 'react';
// import Modal from 'react-modal';
import {Button,Modal} from 'react-bootstrap';
import parse from 'html-react-parser'
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";

import axios from 'axios';
import {Link} from "react-router-dom";

export default class Listing extends Component{
    constructor()
    {
        super();
        this.state={
            advertisings:[],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
            showModal:false
        }
        this.handlePageChange=this.handlePageChange.bind(this);
    }
    componentDidMount()
    {
        axios.get('http://localhost:8080/advertisingcampaign/api/advertising')
            .then(response=>{
                this.setState({
                    advertisings:response.data.data,
                    itemsCountPerPage:response.data.per_page,
                    totalItemsCount:response.data.total,
                    activePage:response.data.current_page
                });
            });
    }
    onDelete(advertising_id)
    {
        axios.delete('http://localhost:8080/advertisingcampaign/api/advertising/delete/'+advertising_id)
            .then(response=>{
                var advertisings = this.state.advertisings;
                for (var i=0; i<advertisings.length;i++) {
                    if(advertisings[i].id == advertising_id){
                        advertisings.splice(i,1);
                        this.setState({advertisings:advertisings});
                    }
                }
            });
    }
    onModalView(advertising_id)
    {
        this.setState({showModal:!this.state.showModal})
        axios.get('http://localhost:8080/advertisingcampaign/api/advertising/show/'+advertising_id)
            .then(response=>{
                //This data will come to modal view
                this.setState({showModalName:response.data.name});
                this.setState({showModalDailyBudget:response.data.daily_budget});
                this.setState({showModalTotalBudget:response.data.total_budget});
                this.setState({showModalValidFrom:response.data.valid_from});
                this.setState({showModalValidTo:response.data.valid_to});
                this.setState({showModalImage:response.data.banner_images});
                const Images=response.data.banner_images;
                const arrayImages= JSON.parse(Images);
                var domImage='';
                for( var i=0; i<arrayImages.length;i++){

                    domImage +='<img class="col-md-4" src="http://localhost:8080/advertisingcampaign/public/advertising/'+arrayImages[i]+'"/>';
                }
                this.setState({modalImages:domImage});

                //console.log(JSON.parse(Images))

                //console.log(Images);
            });

    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        //this.setState({activePage: pageNumber});
        //http://localhost:8080/advertisingcampaign/advertising?page=2"
        axios.get('http://localhost:8080/advertisingcampaign/api/advertising?page='+pageNumber)
        .then(response=>{
            this.setState({
                advertisings:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        });
    }
    render(){

    return (
        <div >
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Valid Till</th>
                    <th scope="col">Total Budget</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.advertisings.map(advertising=>{
                        return (
                            <tr>
                                <th scope="row">{advertising.id}</th>
                                <td>{advertising.name}</td>
                                <td>{advertising.valid_to}</td>
                                <td>{advertising.total_budget}</td>
                                <td>
                                    <Button onClick={this.onModalView.bind(this,advertising.id)} className="btn-sm">view</Button>
                                    <Modal show={this.state.showModal} >
                                        <Modal.Header >
                                            <Modal.Title>Advertising Campaign Details</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Name: {this.state.showModalName}<hr/>
                                            Valid To: {this.state.showModalValidTo}<hr/>
                                            Valid From: {this.state.showModalValidFrom}<hr/>
                                            Total Budget: {this.state.showModalTotalBudget}<hr/>
                                            Daily Budget: {this.state.showModalDailyBudget}<hr/>
                                            Image: <div className="row" dangerouslySetInnerHTML={{__html: this.state.modalImages}} />

                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={()=>{this.onModalView()}}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <Link className="btn btn-success btn-sm" to={`/advertising/edit/${advertising.id}`}>Edit</Link>
                                    <a href="#" className="btn btn-danger btn-sm" onClick={this.onDelete.bind(this,advertising.id)}>Del </a></td>
                            </tr>
                        )
                    })
                }

                </tbody>
            </table>
            <div className='d-flex justify-content-center'>
            <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemsCountPerPage}
                totalItemsCount={this.state.totalItemsCount}
                pageRangeDisplayed={this.state.pageRangeDisplayed}
                onChange={this.handlePageChange}
                itemClass='page-item'
                linkClass='page-link'
            /></div>
        </div>
    );
    }
}

