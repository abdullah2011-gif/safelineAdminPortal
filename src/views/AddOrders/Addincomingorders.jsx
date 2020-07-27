import React from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from '../../NodeFunctions/Functions'
import SweetAlert from 'react-bootstrap-sweetalert';
import $ from "jquery";
require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");




class Closeit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: {},
      details:[],
      alert:null
    };
  }
  componentDidMount() {
    new Apimanager().Getroute('Warehouse_manager/incomming_order').then((res)=>  {
  res.shift()
      this.setState(prevState=>{
        return{
          ...prevState,
          details:res,
        }
      })
    }).catch(e=>console.log(e))
    setTimeout(() => {
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
    }, 1000);
    
    }
    componentWillUnmount() {
      $(".data-table-wrapper")
        .find("table")
        .DataTable()
        .destroy(true);
    }
    editrecord=(item,key)=>{
      this.props.history.push({
        pathname: `/admin/vieworders`,
        data:{data:this.state.details[key].orders,
        id:this.state.details[key].order_id,
        cus_det:{L_name:this.state.details[key].cus_det.L_name,
        email:this.state.details[key].cus_det.E_mail,
        cus_id:this.state.details[key].cus_det.cus_id,
        order_id:this.state.details[key].order_id,
        }
      }
      })
    }
    modalVisible=(id)=>{
      this.setState({
        alert: (
            <SweetAlert
                danger
                style={{display: "block",marginTop: "100px"}}
                title={`Are you Sure You Want To Delete Record Of ID ${id} !`}
                onConfirm={() =>this.deleterecord(id) }
                onCancel={() =>this.setState({alert: null}) }
                confirmBtnBsStyle="Danger"
                showCancel
                confirmBtnText='Yes'
            >
            </SweetAlert>
        )
    })
    }
    deleterecord=(id)=>{
      new Apimanager().deleterouteByid(`Admin/memberships/${id}`).then((res)=>{
        if(res.status===200){
          this.setState({
            alert: (
              <SweetAlert
                  success
                  style={{display: "block",marginTop: "100px"}}
                  title={`Successfully Delete Record Of ID ${id} !`}
                  onConfirm={() => this.setState({alert: null})}
                  onCancel={() => this.deleterecord(id)}
                  confirmBtnBsStyle="Warning"
              >
              </SweetAlert>
          )
          })
        }
      }).then(()=>this.componentDidMount())
    }
    // navigationmodal=(prop,key)=>{
    //   this.setState({
    //     alert: (
    //         <SweetAlert
    //             warning
    //             style={{display: "block",marginTop: "100px"}}
    //             title={`Select An Option !`}
    //             onConfirm={() =>this.editrecord(null,key) }
    //             onCancel={() =>this.editrecord(prop,key) }
    //             confirmBtnBsStyle="Danger"
    //             showCancel
    //             confirmBtnText='Add New Order'
    //             cancelBtnText='Add New Item'
    //         >
    //         </SweetAlert>
    //     )
    // })
    // }
  render() {

  //   var datarow = [];
  //   this.state.details.map(item=>{
  //    var data =    item.cus_det.closet_details.map(obj=>([item.cus_det.cus_id,item.cus_det.F_name+' '+item.cus_det.L_name,item.cus_det.Contact_no_1,item.cus_det.E_mail,item.cus_det.social_security_number,obj.closetdet.closet_id,obj.closetdet.closet_name,obj.closetdet.city]))
  //  datarow= datarow.concat(data)
  // })
  //   var dataTable = {
  //     headerRow: ["Customer Id","Customer Name","Contact","Email","Social Security number","Closet Id","Closet Name","Closet City"],
  //     dataRows: datarow
  //   };

    var dataTable = {
      headerRow: ["Customer Id","Customer Name","Contact","Email","Social Security number"],
      dataRows:  this.state.details.map(item=>[item.cus_det.cus_id,item.cus_det.F_name+' '+item.cus_det.L_name,item.cus_det.Contact_no_1,item.cus_det.E_mail,item.cus_det.social_security_number])
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
