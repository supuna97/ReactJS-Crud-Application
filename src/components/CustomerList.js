import React , { Component } from "react";
import Customer from "./Customer";

class CustomerList extends Component{

    onDelete = id => {
        
        // console.log("customer list", id);
        this.props.onDelete(id);
    }

    onEdit = data =>{
        
        // console.log("customer list", data);
        this.props.onEdit(data);
    }

    render(){

        const customers = this.props.customers;

        return(

            <div className="data">
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers.map((customer) =>{
                                return(
                                    <Customer customer={customer} 
                                    key={customer.id} 
                                    onDelete={this.onDelete} 
                                    onEdit={this.onEdit}/>
                                );
                            })
                        }
                       
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CustomerList;