import React from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from '../../NodeFunctions/Functions'
import $ from "jquery";
require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");

class Closeit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details:[],
      alert:null
    };
  }
  componentDidMount() {
    new Apimanager().Getroute('customers/customer_info').then((res)=>  {
  res.shift()
      this.setState(prevState=>{
        return{
          ...prevState,
          details:res,
        }
      })
      if(!this.state.isdatableinitialize){ $("#datatables").DataTable({
        pagingType: "full_numbers",
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Search records"
        }
      });
    this.setState({isdatableinitialize:true})
    }
    
    }).catch(e=>console.log(e))
      
    }
    componentWillUnmount() {
      $(".data-table-wrapper")
        .find("table")
        .DataTable()
        .destroy(true);
    }
    editrecord=(item,key)=>{
      this.props.history.push({
        pathname: `/admin/Closetdetails_items`,
        data:{closet_details:this.state.details[key].closet_details,
        cus_det:{
                cus_id:this.state.details[key].cus_id,
                _id:this.state.details[key]._id,
            },
                }
                })
              }
    
  render() {

    var dataTable = {
      headerRow: ["Customer Id","Customer Name","Contact","Email","Social Security number"],
      dataRows:  this.state.details.map(item=>[item.cus_id,item.F_name+' '+item.L_name,item.Contact_no_1,item.E_mail,item.social_security_number])
    };
    return (
      <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
        <div
          className="fresh-datatables"
          style={{
            width: "90%",
            marginLeft: "5%",
            padding: 15,
            backgroundColor: "#f7f7f8",
          }}
        >
          <table
            scrollX={true}
            id="datatables"
            ref="main"
            className="table table-striped table-no-bordered table-hover"
            cellSpacing="0"
            width="100%"
            align="center"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th style={{fontWeight:'bold',color:'#000000'}}>{dataTable.headerRow[0]}</th>
                <th style={{fontWeight:'bold',color:'#000000'}}>{dataTable.headerRow[1]}</th>
                <th style={{fontWeight:'bold',color:'#000000'}}>{dataTable.headerRow[2]}</th>
                <th style={{fontWeight:'bold',color:'#000000'}}>{dataTable.headerRow[3]}</th>
                <th style={{fontWeight:'bold',color:'#000000'}}>{dataTable.headerRow[4]}</th>
                <th style={{fontWeight:'bold',color:'#000000'}}>
                  {dataTable.headerRow[5]}
                </th>
              </tr>
            </thead>
            <tbody>
              {dataTable.dataRows.map((prop, key) => {
                return (
                  <tr key={key}>
                    {prop.map((prop, key) => {
                      return <td key={key}>{prop}</td>;
                    })}
                    <td style={{ width: "18%" }} className="text-right">
                      <Button onClick={()=>this.editrecord(prop,key)} bsStyle="warning">
                        Select
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {this.state.alert}
      </div>
    );
  }
}

export default Closeit;
