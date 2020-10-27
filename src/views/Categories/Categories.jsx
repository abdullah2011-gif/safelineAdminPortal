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
import Axios from "axios";
import config from "../../config";

// require("datatables.net-responsive");
// $.DataTable = require("datatables.net-bs");

class Closeit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      category_detail: [],
      size: null,
      tableNumber: null,
      modal: false,
      location: "",
      isdatableinitialize: false,
      minSize: null,
      totalCap: null,
      remainingCap: null,
    };
  }
  createTable = () => {
    console.log(this.state.location);
    new Apimanager()
      .postroute("admin/making/tables", {
        tableNumber: this.state.tableNumber,
        size: this.state.size,
        location: this.state.location,
        minSize: this.state.minSize,
      })
      .then((res) => {
        console.log(res);
        this.componentDidMount();
        this.setState({ size: null, tableNumber: null, modal: false });
      });
  };
  componentDidMount() {
    new Apimanager().Getroute("Admin/bardetail").then((res) => {
      this.setState({
        totalCap: res.totalCapacity,
        remainingCap: res.remainigCapacity,
      });
    });
    new Apimanager().Getroute("admin/making/tables").then((res) => {
      this.setState({
        category_detail: res,
      });
      // if (!this.state.isdatableinitialize) {
      //   $("#datatables").DataTable({
      //     pagingType: "full_numbers",
      //     lengthMenu: [
      //       [10, 25, 50, -1],
      //       [10, 25, 50, "All"],
      //     ],
      //     language: {
      //       search: "_INPUT_",
      //       searchPlaceholder: "Search records",
      //     },
      //   });
      //   this.setState({ isdatableinitialize: true });
      // }
    });
  }
  editrecord = (prop, key, key1) => {
    // console.log(prop, key, key1);
    // return;
    if (key1 == "open") {
      new Apimanager()
        .PutrouteByid("admin/opentable/", { barTableId: prop[0] })
        .then((res) => {
          console.log(res);
          if (res.status == 200)
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
          this.componentDidMount();
        });
    } else {
      new Apimanager()
        .PutrouteByid("admin/making/tables/" + prop[0])
        .then((res) => {
          if (res.data)
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
          this.componentDidMount();
        });
    }
  };
  openBar = () => {
    new Apimanager().PutrouteByid("admin/closingbar").then((res) => {
      if (res.data)
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
      this.componentDidMount();
    });
  };
  closeBar = () => {
    new Apimanager().postroute("admin/closingbar").then((res) => {
      if (res.data)
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
      this.componentDidMount();
    });
  };
  // componentWillUnmount() {
  //   $(".data-table-wrapper").find("table").DataTable().destroy(true);
  // }
  delete = (id) => {
    Axios.delete(`${config.url}admin/making/tables/${id}`)
      .then((res) => {
        if (res.data && res.data.success) {
          this.componentDidMount();
          this.setState({ alert: null });
        } else
          this.setState({
            alert: (
              <SweetAlert
                warning
                style={{ display: "block", marginTop: "100px" }}
                title={"Cannot delete table now please open the table!"}
                onConfirm={() => this.setState({ alert: null })}
                onCancel={() => this.setState({ alert: null })}
                confirmBtnBsStyle="warning"
              ></SweetAlert>
            ),
          });
      })
      .catch((e) => console.log(e));
  };
  render() {
    var dataTable = {
      headerRow: [
        "Id",
        "Table number",
        "Minimum size",
        "Maximum size",
        "Location",
        "Status",
      ],
      dataRows: this.state.category_detail.map((item) => [
        item.barTableId,
        item.tableNumber,
        item.minSize,
        item.size,
        item.location,
        item.status == "close" ? "booked" : item.status,
      ]),
    };

    return (
      <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
        <Button
          style={{
            marginLeft: "37%",
            marginTop: 20,
            marginBottom: 20,
            width: 120,
          }}
          onClick={this.openBar}
          bsStyle="warning"
        >
          Open bar
        </Button>
        <Button
          style={{ marginLeft: "5%", width: 120 }}
          onClick={this.closeBar}
          bsStyle="warning"
        >
          Close bar
        </Button>
        <div
          className="fresh-datatables"
          style={{
            width: "70%",
            marginLeft: "15%",
            padding: 15,
            backgroundColor: "#f9f9f9",
          }}
        >
          {/* <div
            style={{
              backgroundColor: "white",
              paddingLeft: "15%",
              paddingTop: "2%",
              paddingBottom: "2%",
            }}
          > */}

          {/* </div> */}
          <Button
            round={true}
            pullRight
            onClick={() => this.setState({ modal: true })}
            style={{ marginBottom: 10 }}
          >
            Add table
          </Button>
          <div>
            <span>Total Capacity: {this.state.totalCap}</span>
            <span style={{ marginLeft: "10%" }}>
              Current Capacity: {this.state.remainingCap}
            </span>
          </div>
          <span style={{ marginLeft: "10%" }}></span>
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
                <th style={{ fontWeight: "bold", color: "#000000" }}>
                  {dataTable.headerRow[5]}
                </th>
                <th style={{ fontWeight: "bold", color: "#000000" }}>
                  {dataTable.headerRow[6]}
                </th>
                <th style={{ fontWeight: "bold", color: "#000000" }}>
                  {dataTable.headerRow[7]}
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
                    {prop[5] == "open" ||
                    prop[5] == "disable" ||
                    prop[5] == "booked" ? (
                      <td className="text-right">
                        <Button
                          style={{ marginRight: 8, width: 80 }}
                          onClick={() =>
                            prop[5] == "booked"
                              ? this.editrecord(prop, key, "open")
                              : this.editrecord(prop, key)
                          }
                          bsStyle="warning"
                        >
                          {prop[5] == "close"
                            ? "open"
                            : prop[5] == "open"
                            ? "Disable"
                            : "open"}
                        </Button>
                      </td>
                    ) : (
                      <td className="text-right"></td>
                    )}
                    <td>
                      <Button
                        style={{ width: 70 }}
                        onClick={() =>
                          this.setState({
                            alert: (
                              <SweetAlert
                                warning
                                style={{ display: "block", marginTop: "100px" }}
                                title={"Do you want to delete table!"}
                                onConfirm={() => this.delete(prop[0])}
                                onCancel={() => this.setState({ alert: null })}
                                confirmBtnBsStyle="warning"
                                confirmBtnText="yes"
                                cancelBtnText="No"
                                showCancel={true}
                              ></SweetAlert>
                            ),
                          })
                        }
                        bsStyle="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {this.state.alert}
        <Modal show={this.state.modal} style={{}}>
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
                                label: "Minimum Table size",
                                type: "number",
                                defaultValue: this.state.minSize,
                                bsClass: "form-control",
                                placeholder: "Table size",
                                onChange: (evt) => {
                                  this.setState({
                                    minSize: evt.target.value,
                                  });
                                },
                              },
                            ]}
                          />
                          <FormInputs
                            ncols={["col-md-6", "col-md-6"]}
                            properties={[
                              {
                                label: "Maximum Table Size",
                                type: "number",
                                bsClass: "form-control",
                                placeholder: "Table number",
                                defaultValue: this.state.size,
                                onChange: (evt) => {
                                  this.setState({
                                    size: evt.target.value,
                                  });
                                },
                              },
                              {
                                label: "Location",
                                control: true,
                                defaultValue: this.state.size,
                                child: [
                                  { title: "Inside", value: "Inside" },
                                  { title: "Deck", value: "Deck" },
                                  { title: "Club Rush", value: "Club Rush" },
                                  {
                                    title: "Parking Lot",
                                    value: "Parking Lot",
                                  },
                                ],
                                placeholder: "Location",
                                variant: "outline-secondary",
                                title: "Location",
                                id: "input-group-dropdown-2",
                                onChange: (evt) => {
                                  this.setState({
                                    location: evt.target.value,
                                  });
                                },
                              },
                            ]}
                          />
                          <Col></Col>
                          <Button
                            style={{ marginLeft: "35%" }}
                            bsStyle="warning"
                            onClick={() =>
                              this.setState({
                                size: null,
                                modal: false,
                                tableNumber: null,
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
                            add table
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
