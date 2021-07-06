import React, { Component } from 'react'
import {Urls} from './urls'
import axios from 'axios'

class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataa:[],
            succ:'',
            err:'',
            Namee:'',
            Email:'',
            DOB:'',
            Gender:''
        }
        //this.InsertData=this.InsertData.bind(this);
    }

    componentDidMount() {
        this._getUsers();
    }
    // useEffect(()=>{

    // },[]);
    _deleteUser(Id){
        axios.delete(Urls.sampleUrl+"/"+Id)
        .then((res)=>{
            if(!res.data.Result.includes("Error")){
                this.setState({
                    succ:res.data.Result,
                    err:''
                })
            }else{
                this.setState({
                    succ:'',
                    err:res.data.Result,
                })
            }
            setTimeout(()=>{
                this._getUsers();
            },2500)
        })
    }

    async _getUser(Id){
        await axios.get(Urls.sampleUrl+"/"+Id)
        .then((res)=>{
            this.setState({
                Namee:res.data.Result[0].Namee,
                Email:res.data.Result[0].Email,
                DOB:res.data.Result[0].DOB,
                Gender:res.data.Result[0].Gender
            })
        })
    }

    async _getUsers(){
        await axios.get(Urls.sampleUrl)
        .then((res)=>{
            this.setState({
                dataa:res.data.Result,
                succ:'',
                err:''
            })
            // console.log(res.data.Result);
        })
    }

    onNameChange=e=>{
        this.setState({Namee:e.target.value})
    }
    onEmailChange=e=>{
        this.setState({Email:e.target.value})
    }
    onDOBChange=e=>{
        this.setState({DOB:e.target.value})
    }
    onGenderChange=e=>{
        this.setState({Gender:e.target.value})
    }

    async InsertData() {
        var dataa={
            Namee:this.state.Namee,
            Email:this.state.Email,
            DOB:this.state.DOB,
            Gender:this.state.Gender,
            Created_Date:this.state.DOB
        }
        //alert(dataa);
        await axios.post(Urls.sampleUrl,dataa)
        .then((res)=>{
            console.log(res.data.Result);
            console.log(dataa);
            this._getUsers();
        })
    }

    async _UpdateUser(Id) {
        
        var dataa={
            Namee:this.state.Namee,
            Email:this.state.Email,
            DOB:this.state.DOB,
            Gender:this.state.Gender,
            Created_Date:this.state.DOB
        }
        await axios.put(Urls.sampleUrl+"/86",dataa)
        .then((res)=>{
            console.log(res.data.Result);
            console.log(dataa);
            this._getUsers();
        })
    }


    render() {
        
        return (
            <>
                <div className="container">
                    <div className="row">
                        
                            <div className="col-md-3">
                                Name: <input type="text" onChange={this.onNameChange} name="Namee" className="form-control"/>
                            </div>
                            <div className="col-md-3">
                                Email: <input type="text" onChange={this.onEmailChange} name="Email" className="form-control"/>
                            </div>
                            <div className="col-md-3">
                                Date of Birth: <input type="text" onChange={this.onDOBChange} name="DOB" className="form-control"/>
                            </div>
                            <div className="col-md-3">
                                Gender: <input type="text" onChange={this.onGenderChange} name="Gender" className="form-control"/>
                            </div>
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-success" onClick={this.InsertData.bind(this)} >Save</button>
                            </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <span style={{color:"white",backgroundColor:"green"}}>{this.state.succ}</span>
                            <span style={{color:"white",backgroundColor:"red"}}>{this.state.err}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-responsive table striped">
                                <tr>
                                    <th>Name</th>
                                    <th>Email Address</th>
                                    <th>Date of Birth</th>
                                    <th>Gender</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {
                                    this.state.dataa.map((dat)=>
                                    <tr key={dat.Id}>
                                        <td>{dat.Namee}</td>
                                        <td>{dat.Email}</td>
                                        <td>{dat.DOB}</td>
                                        <td>{ (() => {
                                            if (dat.Gender==1){
                                                return(
                                                    <span>Male</span>
                                                )
                                        } else {
                                            return(
                                                <span>Female</span>
                                            )
                                        }})()}</td>
                                        <td><button className="btn btn-link" value={dat.Id} onClick={()=>{this._deleteUser(dat.Id)}} Id={dat.Id}>Delete</button></td>
                                        <td><button className="btn btn-link" value={dat.Id} onClick={()=>{this._UpdateUser(dat.Id)}} Id={dat.Id}>Update</button></td>
                                    </tr>
                                    )
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Users