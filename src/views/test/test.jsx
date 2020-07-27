import React from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from '../../NodeFunctions/Functions'
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import $ from "jquery";
require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");

class Closeit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        rows: [],
        cols: [],
    };
  }
  rendertable() {
// $("#datatables").DataTable({
//         pagingType: "full_numbers",
//         lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
//         language: {
//           search: "_INPUT_",
//           searchPlaceholder: "Search records"
//         }
//       });
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
              changeHandler = async (event) => {
                  var rows = []
                let fileObj = event.target.files[0];
                //just pass the fileObj as parameter
               await ExcelRenderer(fileObj, (err, resp) => {
                  if (err) {
                    console.log(err);
                  } else {
                    JSON.stringify(resp.rows)
                    rows =resp.rows
                    for (let i = 1; i < resp.rows.length; i++) {
                        const element = resp.rows[i];
                  var data =   {  
                          productId:resp.rows[i][0],
                          productName:resp.rows[i][1],
                          productQuantity:resp.rows[i][2],
                          storePrice_1:resp.rows[i][3],
                          storePrice_2:resp.rows[i][4],
                          storePrice_3:resp.rows[i][5],
                          imageUrl:resp.rows[i][6],
                        }
                        new Apimanager().postroute('test',data).then(res=>{
                              console.log(res)
                        })
                    }
                    // console.log(JSON.stringify(resp.rows[0]));
                this.setState({
                    rows: resp.rows
                  });
                  }
                });

this.rendertable()
              }
  render() {
    var dataTable = {
      headerRow: ["Product Code","Product Name","Store Price 1","Store Price 2","Store Price 3","Image URL"],
      dataRows: this.state.rows //this.state.details.map(item=>[item.cus_id,item.F_name+' '+item.L_name,item.Contact_no_1,item.E_mail,item.social_security_number])
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
                    {/* <td style={{ width: "18%" }} className="text-right">
                      <Button onClick={()=>this.editrecord(prop,key)} bsStyle="warning">
                        Select
                      </Button>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
                        <h1>Upload File</h1>
                        <input
                          className="btn"
                          type="file"
                          onChange={(e)=>this.changeHandler(e)}
                          style={{ padding: "10px" }}
                        />
                        {/* <OutTable
                          data={this.state.rows}
                          columns={this.state.cols}
                          tableClassName="ExcelTable2007"
                          tableHeaderRowClass="heading"
                        /> */}
                      </div>
        </div>
        {this.state.alert}
      </div>
    );
  }
}

export default Closeit;
