import React, { Component } from 'react'
import {Urls} from './urls'
import axios from 'axios'

class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataa:[],
            succ:'',
            err:''
        }
        
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

    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <span style={{color:"white",backgroundColor:"green"}}>{this.state.succ}</span>
                            <span style={{color:"white",backgroundColor:"red"}}>{this.state.err}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {this.state.dataa.map((dat)=>
                                <div key={dat.Id}>
                                    <b>Name:</b> {dat.Namee}, <b>Email Address:</b> {dat.Email}, <b>Date Of Birth:</b> {dat.DOB}
                                    <br/>
                                    <button className="btn btn-primary" key={dat.Id} value={dat.Id} onClick={()=>{this._deleteUser(dat.Id)}} Id={dat.Id}>Delete</button>
                                    <hr></hr>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Users