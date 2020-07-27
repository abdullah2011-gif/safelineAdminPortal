import React from "react";
import Button from '../components/CustomButton/CustomButton'
import Apimanager from '../NodeFunctions/Functions'
import SweetAlert from 'react-bootstrap-sweetalert';
import $ from "jquery";
 
require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");

class Closeit extends React.Component{
  constructor(props) {
    super(props);
     this.state = { pictures: {},alert: null,employees:[]};
}
onDrop=(picture)=> {
  console.log(picture)
  this.setState({
      pictures: picture,
  });
}
componentDidMount() {
new Apimanager().Getroute('Admin/employees').then((res)=>  {
  console.log(res.detail,"detail")
res.shift()
  this.setState(prevState=>{
    return{
      ...prevState,
      employees:res,
    }
  })
})
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
    pathname: `/admin/add_accounts`,
    data:this.state.employees[key]// your data array of objects
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
  new Apimanager().deleterouteByid(`Admin/employees/${id}`).then((res)=>{
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
  render(){
    var dataTable = {
      headerRow: ["Employee Id", "Employee Name", "Email","Social Security Number","Contact"],
      dataRows: this.state.employees.map(item=>[item.emp_id,item.emp_name,item.emp_email,item.emp_ssn,item.emp_contact])
    };
    
    return (
      <div style={{width:'100%',backgroundColor:'#ffffff'}}>
      <div className="fresh-datatables" style={{width:'90%',backgroundColor:'#f9f9f9',marginLeft:'5%',padding:15}}>
        <table
        scrollX={true}
          id="datatables"
          ref="main"
          onScroll={true}
          className="table table-striped table-no-bordered table-hover"
          cellSpacing="0"
          width="100%"
          align='center'
          style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{fontWeight:'bold',color:'#000000'}}>{dataTable.headerRow[0]}</th>
              <th style={{fontWeight:'bold',color:'#000000'}}>{dataTable.headerRow[1]}</th>
              <th style={{fontWeight:'bold',color:'#000000'}}>{dataTable.headerRow[2]}</th>
              <th style={{fontWeight:'bold',color:'#000000'}}>{dataTable.headerRow[3]}</th>
              <th style={{fontWeight:'bold',color:'#000000'}}>{dataTable.headerRow[4]}</th>
              <th  style={{fontWeight:'bold',color:'#000000'}}>
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
                 <td style={{width:'20%'}} className="text-right">
                     <Button style={{marginRight:8,width:70}} onClick={()=>this.editrecord(prop,key)} bsStyle="warning">Edit</Button>
                    <Button style={{width:70}} onClick={()=>this.modalVisible(prop[0])} bsStyle="danger">Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {this.state.alert}
      </div>
    )
  }
}

export default Closeit;