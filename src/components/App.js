import React, { Component } from "react";
import MyForm from "./MyForm";
import CustomerList from "./CustomerList";
import "./app.css";
import Loader from "./Loader";
import axios from "axios";

class App extends Component {


    state = {
        customers : [],
        customer : {},
        url:"http://127.0.0.1:8000/api/customers"
    };

    getCustomers = async () => {
        this.setState({loader: true});
        const customers = await axios.get(this.state.url);
        this.setState({customers:customers.data , loader:false});
    };

    createCustomer = async data =>{

        this.setState({loader: true});
        await axios.post(this.state.url,{
            first_name:data.first_name,
            last_name:data.last_name,
            email:data.email
        });

        this.getCustomers();
    }

    editCustomer = async data =>{

        //clear customer object
        this.setState({customer:{}, loader:true});
        await axios.put(`${this.state.url}/${data.id}`,{
            first_name:data.first_name,
            last_name:data.last_name,
            email:data.email
        });

        this.getCustomers();

    }

    deleteCustomer = async id => {
       
        this.setState({loader: true});
        // console.log("hello", id);

        await axios.delete(`${this.state.url}/${id}`);

        this.getCustomers();
    };

    componentDidMount() {

        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        
        this.getCustomers();
    };

    onDelete = id =>{

        // console.log("App",id);
        this.deleteCustomer(id);
    }

    onEdit = data =>{

        // console.log("App",data);
        // this.editCustomer(data);
        this.setState({customer:data});
    }

    onFormsSubmit = data =>{

        // console.log("app", data);
        if(data.isEdit){
            // if is edit true
            this.editCustomer(data);
        }else{
            // if is edit false
            this.createCustomer(data);
        }

    }

    render(){

        return (
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">

                        <a href="/#" className="header item">
                            React JS CRUD with Laravel API
                        </a>

                    </div>
                </div>

                <div className="ui main container">
                    <MyForm customer={this.state.customer} onFormsSubmit={this.onFormsSubmit}/>
                    {this.state.loader ? <Loader /> : ""}
                    <CustomerList customers={this.state.customers} 
                    onDelete={this.onDelete} 
                    onEdit={this.onEdit} />
                </div>

            </div>
        );
    }
}

export default App;