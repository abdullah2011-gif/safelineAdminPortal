import React from "react";
import Apimanager from '../../NodeFunctions/Functions'
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
    new Apimanager().Getroute('warehouse_manager/item_induction/checkoutdetail').then((res)=>  {
//   res.shift()
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

  render() {

    var dataTable = {
      headerRow: ["Item Id","Item Name","Item Brand","Item Colour","Checkout Id","Checkout Reason","Focal Contact"],
      dataRows:  this.state.details.map(item=>[item.item_id,item.item_name,item.item_brand,item.item_colour,item.checkout_det.checkout_id,item.checkout_det.checkout_reason,item.checkout_det.focal_contact])
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
            // width="100%"
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
              </tr>
            </thead>
            <tbody>
              {dataTable.dataRows.map((prop, key) => {
                return (
                  <tr key={key}>
                    {prop.map((prop, key) => {
                      return <td key={key}>{prop}</td>;
                    })}
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
