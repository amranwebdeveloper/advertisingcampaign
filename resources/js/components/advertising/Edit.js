import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

// this is for Edit data for field
export default class Edit extends Component{
    constructor(props)
    {
        super(props);
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

    componentDidMount()
    {
        axios.get('http://localhost:8080/advertisingcampaign/api/advertising/edit/'+this.props.match.params.id)
            .then(response=>{
                this.setState({advertising_name:response.data.name});
                this.setState({daily_budget:response.data.daily_budget});
                this.setState({total_budget:response.data.total_budget});
                this.setState({valid_from:response.data.valid_from});
                this.setState({valid_to:response.data.valid_to});
                this.setState({showModalImage:response.data.banner_images});
                const Images=response.data.banner_images;
                const arrayImages= JSON.parse(Images);
                var domImage='';
                for( var i=0; i<arrayImages.length;i++){

                    domImage +='<img class="col-md-4" src="http://localhost:8080/advertisingcampaign/public/advertising/'+arrayImages[i]+'"/>';
                }
                this.setState({modalImages:domImage});
            });
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
        let file= e.target.files;
        this.setState({file: file})
    }
    onSubmit(e)
    {
        e.preventDefault();
        let file= this.state.file

        let advertising = new FormData()

        // Data append for all fields
        advertising.append('advertising_name',this.state.advertising_name)
        advertising.append('valid_from',this.state.valid_from)
        advertising.append('valid_to',this.state.valid_to)
        advertising.append('daily_budget',this.state.daily_budget)
        advertising.append('total_budget',this.state.total_budget)
        for(var i=0;i< this.state.file.length; i++){
            let file= this.state.file[i];
            advertising.append('banner_images[]',file)
            //console.warn(file);
        }
        // for loop use for the multi image as Array pass by API
        axios.put('http://localhost:8080/advertisingcampaign/api/advertising/update/'+this.props.match.params.id,advertising)
        .then(res=>{
              this.setState({alert_message:"success"});
        }).catch(error=>{
            this.setState({alert_message: "error"});
        })
        // if store data for alert message with success and error
    }
    render(){
    return (
        <div className="row justify-content-center">
            <div>
                {this.state.alert_message=="success"?<SuccessAlert/>:null}
                {this.state.alert_message=="error"?<ErrorAlert/>:null}
                {/*print the success or error data*/}
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
                <div className="form-row">
                    <div className="row" dangerouslySetInnerHTML={{__html: this.state.modalImages}} />
                </div>
                <div className="custom-file">

                    <input type="file"
                           name="file"
                           multiple
                           className="custom-file-input"
                           id="customFile"
                           onChange={(e)=>this.onChangeBannerImages(e)} />
                        <label className="custom-file-label"  htmlFor="file">Choose file</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
    }
}

