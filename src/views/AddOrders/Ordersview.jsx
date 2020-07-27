import React from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from '../../NodeFunctions/Functions'
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from "moment";
import $ from "jquery";
require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");




class Closeit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: {},
      isdatableinitialize:false,
      details:[],
      alert:null,
      cus_det:{},
      id:''
    };
  }
  componentDidMount() {
   new Promise(()=>{
    if(!this.state.isdatableinitialize){
      if(this.props.location.data){
        const  {data } = this.props.location
        // console.log(data,"here i am");
        this.setState({
          details:data.data,
          id:data.id,
          cus_det:data.cus_det
        });}}
   }).then(()=>{
    if(!this.state.isdatableinitialize){
      $("#datatables").DataTable({
      pagingType: "full_numbers",
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records"
      }
    });
  this.setState({isdatableinitialize:true})
  }
   })
    }
    componentWillUnmount() {
      $(".data-table-wrapper")
        .find("table")
        .DataTable()
        .destroy(true);
    }
    editrecord=(prop,key)=>{
      this.props.history.push({
        pathname: `/admin/incomingorders_form`,
        data:{detail:this.state.details[key],
          _id:this.state.details[key]._id,
          id:this.state.id,
        cus_det:this.state.cus_det}
      })
    }
    deleterecord=(prop,key)=>{
      new Apimanager().deleterouteByid(`Warehouse_manager/incomming_order/${this.state.id}/orders/${this.state.details[key]._id}`).then((res)=>{
      //  console.log(JSON.stringify(res.data)+"response")

        if(res.status===200){
          this.setState({
    isdatableinitialize :true,
              details:res.data,
              alert: (
                <SweetAlert
                    success
                    style={{display: "block",marginTop: "100px"}}
                    title={`Successfully Delete Orders !`}
                    onConfirm={() => this.setState({alert: null})}
                    confirmBtnBsStyle="Warning"
                    confirmBtnText='Ok'
                >
                </SweetAlert>
            )  
          })
        }
      }).then(()=>this.componentDidMount())
    }
    addneworder=()=>{
        this.props.history.push({
            pathname: `/admin/add_new_order`,
            data:{id:this.state.id, cus_det:this.state.cus_det} })
    }
    render() {

      // console.log(this.state.details,"details")
        var dataTable = {
          headerRow: ["Mode Of Sending","Shipment Id","Comments","Contact Number","Date","Closet Id","Closet Name","Closet City"],
          dataRows:  this.state.details.map(item=>
          [item.mode_of_sending,item.shipment_id,item.comments,item.contact_number,(item.updatedAt.slice(0,10)),item.closetdet.closet_id,item.closetdet.closet_name,item.closetdet.city,])
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
                    <th style={{fontWeight:'bold',color:'#000000'}}>{dataTable.headerRow[5]}</th>
                    <th style={{fontWeight:'bold',color:'#000000'}}>{dataTable.headerRow[6]}</th>
                    <th style={{fontWeight:'bold',color:'#000000'}}>{dataTable.headerRow[7]}</th>
                    <th style={{fontWeight:'bold',color:'#000000'}}>
                      {dataTable.headerRow[8]}
                    </th>
                    <th style={{fontWeight:'bold',color:'#000000'}}>
                      {dataTable.headerRow[9]}
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
                        <td style={{ width: "10%" }} className="text-right">
                        <Button onClick={()=>this.editrecord(prop,key)} bsStyle="warning">
                            Add Items
                          </Button>
                        </td>
                        <td style={{ width:"10%" }} className="text-right">
                        <Button onClick={()=>this.deleterecord(prop,key)} bsStyle="danger">
                           Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Button onClick={()=> this.addneworder()} bsStyle="warning"style={{marginLeft:"45%",height:40,width:120}}>Add New Order</Button>
            </div>
            {this.state.alert}
          </div>
        );
      }
}

export default Closeit;
