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
      valid: false,
      details:{},
      alert:null,
      id:'',
      cus_det:{}
    };
  }
  componentDidMount() {
    if(this.props.location.data){

        const  {data } = this.props.location
        console.log(data,"here i am");
        this.setState({id:data.id , cus_det:data.cus_det})}
        setTimeout(() => {
        new Apimanager().getrouteByid(`Warehouse_manager/incomming_order/${this.state.id}`).then(res=>{
            console.log(res,'res')
            this.setState({details:res.data,valid:true})
        }).then(()=>{
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
        })
        .catch(e=>console.log(e))
    },2);
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
        data:{detail:'',
          _id:this.state.details.cus_det.closet_details[key].closetdet._id,
          id:this.state.id, cus_det:this.state.cus_det}
      })
    }
    deleterecord=(prop,key)=>{
      new Apimanager().deleterouteByid(`Warehouse_manager/incomming_order/${this.state.id}/orders/${this.state.details[key]._id}`).then((res)=>{
       console.log(JSON.stringify(res.data)+"response")

        if(res.status===200){
          this.setState({
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
    addneworder=(prop,key)=>{
        this.props.history.push({
            pathname: `/admin/incomingorders_form`,
            data:{id:this.state.id,
              _id:''}
          })
    }
    render() {
        var dataRows = []
        if(this.state.valid){
         dataRows =this.state.details.cus_det.closet_details.map(obj=>[this.state.details.cus_det.cus_id,this.state.details.cus_det.F_name+' '+this.state.details.cus_det.L_name,this.state.details.cus_det.Contact_no_1,this.state.details.cus_det.E_mail,this.state.details.cus_det.social_security_number,obj.closetdet.closet_id,obj.closetdet.closet_name,obj.closetdet.city])
        }
        console.log(dataRows,'det')
//[item.cus_det.cus_id,item.cus_det.F_name+' '+item.cus_det.L_name,item.cus_det.Contact_no_1,item.cus_det.E_mail,item.cus_det.social_security_number,obj.closetdet.closet_id,obj.closetdet.closet_name,obj.closetdet.city]
   
          var dataTable = {
            headerRow: ["Customer Id","Customer Name","Contact","Email","Social Security number","Closet Id","Closet Name","Closet City"],
            dataRows: dataRows
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
