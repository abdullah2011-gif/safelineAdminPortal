import React from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from "../../NodeFunctions/Functions";
import {
  Grid,
  Row,
  Col,
  Modal,
  Image,
  DropdownButton,
  MenuItem,
} from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Card } from "components/Card/Card.jsx";
import $ from "jquery";

require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");

class Closeit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      category_detail: [],
      size:null,
      tableNumber:null,
      modal:false,

      isdatableinitialize: false,
    };
  }
  createTable=()=>{
    new Apimanager().postroute('admin/making/tables',{tableNumber:this.state.tableNumber,size:this.state.size}).then(res=>{
      console.log(res)
      this.componentDidMount()
      this.setState({size:null,tableNumber:null,modal:false})
    })
  }
  componentDidMount() {
    new Apimanager().Getroute("admin/making/tables").then((res) => {
      this.setState({
        category_detail: res,
      });
      if (!this.state.isdatableinitialize) {
        $("#datatables").DataTable({
          pagingType: "full_numbers",
          lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "All"],
          ],
          language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records",
          },
        });
        this.setState({ isdatableinitialize: true });
      }
    });
  }
  editrecord=(prop)=>{
    new Apimanager().PutrouteByid("admin/making/tables/"+prop[0]).then((res) => {
      if(res.data)
      this.setState({
        alert: (
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "100px" }}
            title={res.data.message}
            onConfirm={() => this.setState({ alert: null })}
            onCancel={() => this.setState({ alert: null })}
            confirmBtnBsStyle="warning"
          ></SweetAlert>
        ),
      });
      this.componentDidMount()
    })
  }
  componentWillUnmount() {
    $(".data-table-wrapper").find("table").DataTable().destroy(true);
  }
  render() {
    var dataTable = {
      headerRow: ["Id", "Table number","Table size","Status"],
      dataRows: this.state.category_detail.map((item) => [
        item.barTableId,
        item.tableNumber,
        item.size,
        item.status,
      ]),
    };

    return (
      <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
       
        <div
          className="fresh-datatables"
          style={{
            width: "70%",
            marginLeft: "15%",
            padding: 15,
            backgroundColor: "#f9f9f9",
          }}
        >
           <Button round={true} pullRight onClick={()=>this.setState({modal:true})} style={{marginBottom:10}} >Add table</Button>
          <table
            scrollX={true}
            id="datatables"
            ref="main"
            className="table table-striped table-no-bordered table-hover"
            cellSpacing="0"
            align="center"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th style={{ fontWeight: "bold", color: "#000000" }}>
                  {dataTable.headerRow[0]}
                </th>
                <th style={{ fontWeight: "bold", color: "#000000" }}>
                  {dataTable.headerRow[1]}
                </th>
                <th style={{ fontWeight: "bold", color: "#000000" }}>
                  {dataTable.headerRow[2]}
                </th>
                <th style={{ fontWeight: "bold", color: "#000000" }}>
                  {dataTable.headerRow[3]}
                </th>
                <th style={{ fontWeight: "bold", color: "#000000" }}>
                  {dataTable.headerRow[4]}
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
                  {(prop[3]=='open'||prop[3]=='disable')? <td className="text-right">
                      <Button
                        style={{ marginRight: 8, width: 80 }}
                        onClick={() => this.editrecord(prop, key)}
                        bsStyle="warning"
                      >
                        {prop[3]=='open'? 'Disable':'open'}
                      </Button>
                    </td>:<td className="text-right"></td>}
                    {/*  <td>
                      <Button
                        style={{ width: 70 }}
                        onClick={() => this.modalVisible(prop[0])}
                        bsStyle="danger"
                      >
                        Delete
                      </Button>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {this.state.alert}
        <Modal show={this.state.modal} style={{  }}>
          <div className="content">
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Card
                    title="Checkout"
                    content={
                      <form>
                        <Row>
                          <FormInputs
                            ncols={["col-md-6", "col-md-6"]}
                            properties={[
                              {
                                label: "Table number",
                                type: "number",
                                bsClass: "form-control",
                                placeholder: "Table number",
                                defaultValue: this.state.tableNumber,
                                onChange: (evt) => {
                                  this.setState({
                                    tableNumber: evt.target.value,
                                  });
                                },
                              },
                              {
                                label: "Table size",
                                type: "number",
                                defaultValue: this.state.size,
                                bsClass: "form-control",
                                placeholder: "Table size",
                                onChange: (evt) => {
                                  this.setState({
                                    size: evt.target.value,
                                  });
                                },
                              },
                            ]}
                          />
                          <Col>
                          </Col>
                          <Button
                            style={{ marginLeft: "35%" }}
                            bsStyle="warning"
                            onClick={() =>
                              this.setState({
                              size:null,
                              modal:false,
                              tableNumber:null
                              })
                            }
                          >
                            Close
                          </Button>
                            <Button
                              style={{ marginLeft: "5%" }}
                              bsStyle="warning"
                              onClick={this.createTable}
                            >
                              Open table
                            </Button>
                        </Row>
                      </form>
                    }
                  />
                </Col>
              </Row>
            </Grid>
          </div>
          </Modal>
      </div>
    );
  }
}

export default Closeit;
