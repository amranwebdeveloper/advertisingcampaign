import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
// this file for single image
export default class Add extends Component{
    constructor()
    {
        super();
        this.state={
            advertising_name:'',
            valid_from:'',
            valid_to:'',
            daily_budget:'',
            total_budget:'',
            file:''
        }
        this.onChangeAdvertisingName=this.onChangeAdvertisingName.bind(this);
        this.onChangeDailyBudget=this.onChangeDailyBudget.bind(this);
        this.onChangeTotalBudget=this.onChangeTotalBudget.bind(this);
        this.onChangeValidFrom=this.onChangeValidFrom.bind(this);
        this.onChangeValidTo=this.onChangeValidTo.bind(this);
        this.onChangeBannerImages=this.onChangeBannerImages.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChangeAdvertisingName(e)
    {
        this.setState({
            advertising_name:e.target.value
        });
    }
    onChangeDailyBudget(e)
    {
        this.setState({
            daily_budget:e.target.value
        });
    }
    onChangeTotalBudget(e)
    {
        this.setState({
            total_budget:e.target.value
        });
    }
    onChangeValidFrom(e)
    {
        this.setState({
            valid_from:e.target.value
        });
    }
    onChangeValidTo(e)
    {
        this.setState({
            valid_to:e.target.value
        });
    }
    onChangeBannerImages(e)
    {
        let file= e.target.files[0];
       this.setState({file: file})
    }
    onSubmit(e)
    {
        e.preventDefault();

        let file= this.state.file

        let advertising = new FormData()

        advertising.append('advertising_name',this.state.advertising_name)
        advertising.append('valid_from',this.state.valid_from)
        advertising.append('valid_to',this.state.valid_to)
        advertising.append('daily_budget',this.state.daily_budget)
        advertising.append('total_budget',this.state.total_budget)
        advertising.append('banner_images',file)
        console.warn(file);
        // const advertising ={
        //     advertising_name: this.state.advertising_name,
        //     valid_from: this.state.valid_from,
        //     valid_to: this.state.valid_to,
        //     daily_budget: this.state.daily_budget,
        //     total_budget: this.state.total_budget,
        //     banner_images: this.state.banner_images
        // }
        axios.post('http://localhost:8080/advertisingcampaign/api/advertising/store',advertising)
            .then(res=>{
                this.setState({alert_message:"success"});
            }).catch(error=>{
            this.setState({alert_message: "error"});
        })
    }
    render(){
    return (
        <div className="row justify-content-center">
            <div>
                 {this.state.alert_message=="success"?<SuccessAlert/>:null}
                {this.state.alert_message=="error"?<ErrorAlert/>:null}
            </div>
            <form onSubmit={(e)=>this.onSubmit(e)} encType={"multipart/form-data"}>
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <label htmlFor="Name">Name</label>
                        <input type="text" name="advertising_name" className="form-control" id="Name" value={this.state.advertising_name} onChange={this.onChangeAdvertisingName}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="valid_from">valid from</label>
                        <input type="date" className="form-control" name="valid_from" id="valid_from" value={this.state.valid_from} onChange={this.onChangeValidFrom} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="valid_to">valid_to</label>
                        <input type="date" className="form-control" name="valid_to" id="valid_to" value={this.state.valid_to}  onChange={this.onChangeValidTo} />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="daily_budget">daily budget</label>
                        <input type="text" name="daily_budget" className="form-control" id="daily_budget" value={this.state.daily_budget} onChange={this.onChangeDailyBudget} />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="total_budget">total budget</label>
                        <input type="text" name="total_budget" className="form-control" id="total_budget" value={this.state.total_budget} onChange={this.onChangeTotalBudget} />
                    </div>
                </div>
                <div className="custom-file">
                    <input type="file" name="file"  className="custom-file-input" id="customFile" onChange={(e)=>this.onChangeBannerImages(e)} />
                        <label className="custom-file-label"  htmlFor="file">Choose file</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
    }
}

