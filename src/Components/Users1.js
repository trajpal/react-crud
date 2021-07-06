import React, { Component } from 'react'
import axios from 'axios'
import {Urls} from './urls'

class Users1 extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users:[],
            succ:'',
            err:'',
        }
    }

    componentDidMount() {
        this._getUsers();
    }

    // To get the User List
    async _getUsers(){
        await axios.get(Urls.sampleUrl)
        .then((res)=>{
            this.setState({
                users:res.data.Result
            })
        })
    }
    // To Save the User Details.
    _InsertUser(e){
        e.preventDefault();
        var today = new Date(),
            month=("0"+(today.getMonth()+1)).slice(-2),
            datee=("0"+(today.getDate())).slice(-2),
            minutess=("0"+(today.getMinutes())).slice(-2),
            hourss=("0"+(today.getHours())).slice(-2),
            time = hourss + ':' + minutess + ':00',
            dateNow=today.getFullYear()+"/"+month+"/"+datee+" "+time
        
        var dataa={
            Namee:this.refs.txtname.value,
            Email:this.refs.txtemail.value,
            DOB:this.refs.txtdob.value,
            Gender:this.refs.txtgender.value,
            Created_Date:dateNow
        }
        axios.post(Urls.sampleUrl,dataa)
        .then((res)=>{
            console.log(res.data.Result+' Status:'+res.status);
            if(res.status==200){
                this.setState({
                    succ:res.data.Result,
                    err:'',
                })
                this._getUsers();
                this.refs.myform.reset();
            }else{
                this.setState({
                    succ:'',
                    err:res.data.Result,
                })
            }

        })
    }

    // To Update the User Details.
    _UpdateUser(e){
        e.preventDefault();
        var today = new Date(),
            month=("0"+(today.getMonth()+1)).slice(-2),
            datee=("0"+(today.getDate())).slice(-2),
            minutess=("0"+(today.getMinutes())).slice(-2),
            hourss=("0"+(today.getHours())).slice(-2),
            time = hourss + ':' + minutess + ':00',
            dateNow=today.getFullYear()+"/"+month+"/"+datee+" "+time
        
        var dataa={
            Namee:this.refs.txtname.value,
            Email:this.refs.txtemail.value,
            DOB:this.refs.txtdob.value,
            Gender:this.refs.txtgender.value,
            Created_Date:dateNow
        }

        var Idd=this.refs.Idd.value
        try{
            axios.put(Urls.sampleUrl+`/${Idd}`,dataa)
            .then((res)=>{
                
                    this.setState({
                        succ:res.data.Result,
                        err:'',
                    })
                    this._getUsers();
                    this.refs.myform.reset();
                
            })
        }
        catch(e){
            this.setState({
                succ:'',
                err:'Error - '+e.message
            })
        }

        
    }

    // function to delete the user using Id
    async _DeleteUser(Id){
        try{
            await axios.delete(Urls.sampleUrl+`/${Id}`)
            .then((res)=>{
                    this.setState({
                        succ:res.data.Result,
                        err:''
                    })
                    this._getUsers();
            })
        }
        catch (e){
            this.setState({
                err:'Error + '+e.message,
                succ:''
            })
        }
    }

    async _getUser(Id){
        try{
            await axios.get(Urls.sampleUrl+`/${Id}`)
            .then((res)=>{
                let User = res.data.Result[0];

                this.refs.Idd.value = User.Id;
                this.refs.txtname.value = User.Namee;
                this.refs.txtemail.value = User.Email;
                this.refs.txtgender.value = User.Gender;
                this.refs.txtdob.value = User.DOB;    
            })
            
        }
        catch(e){
            this.setState({
                err:"Error: "+e.message,
                succ:''
            })
        }
        await axios.get(Urls.sampleUrl+`/${Id}`)
        .then()
    }

    render() {
        var displayNone = {
            display:"none"
        }
        var displayBlock = {
            display:"block"
        }
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                    <h3><p>Save the User Details</p></h3>
                                    <p>
                            <form ref="myform">
                            <ul style={{listStyle: "none"}}>
                                <li>
                                    <input type="hidden" ref="Idd" />
                                </li>
                                <li>Name:</li>
                                <li><input type="text" className="form-control" ref="txtname" placeholder="Enter Name" /></li>
                                <li>Email:</li>
                                <li><input type="text" className="form-control" ref="txtemail" placeholder="Enter Email" />
                                </li>
                                <li>Date of Birth</li>
                                <li><input type="text" className="form-control" ref="txtdob" placeholder="Enter DOB" /></li>
                                <li>Gender</li>
                                <li><input type="text" className="form-control" ref="txtgender" placeholder="Enter Gender" /></li>
                                <li><br></br></li>
                                <li>
                                    <button className="btn btn-success" style={this.state.btnSave} onClick ={e => this._InsertUser(e)} >Save</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-success" style={this.state.btnUpdate} onClick ={e => this._UpdateUser(e)} >Update</button>
                                </li>
                                <li>
                                    <span className="text-success">{this.state.succ}</span>
                                    <span className="text-danger">{this.state.err}</span>
                                </li>
                            </ul>
                            </form>
                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date of Birth</th>
                                    <th>Gender</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.users.map((user)=>
                                        <tr key={user.Id}>
                                            <td>{user.Namee}</td>
                                            <td>{user.Email}</td>
                                            <td>{user.DOB}</td>
                                            <td>
                                                {
                                                    (()=>{
                                                        if(user.Gender==0){
                                                            return(
                                                                <span>Female</span>
                                                            )
                                                        }
                                                        else{
                                                            return(
                                                                <span>Male</span>
                                                            )
                                                        }
                                                    })()
                                                }
                                            </td>
                                            <td><button type="submit" className="btn btn-link text-primary" onClick={()=>this._getUser(user.Id)}>Edit</button></td>
                                            <td><button type="submit" id={user.Id} className="btn btn-link text-success" onClick={()=>this._DeleteUser(user.Id)}>Delete</button></td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Users1