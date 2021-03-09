import React from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from "../../NodeFunctions/Functions";
import { Grid, Row, Col, Modal, Table } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Card } from "components/Card/Card.jsx";
import Axios from "axios";
import config from "../../config";
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
      .postroute("v1/admin/tables", {
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
    new Apimanager().Getroute("v1/admin/tables").then((res) => {
      this.setState({
        category_detail: res,
      });
    });
  }
  editrecord = (_id) => {
    new Apimanager().postroute("v1/admin/opentable", { _id }).then((res) => {
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
  };
  // componentWillUnmount() {
  //   $(".data-table-wrapper").find("table").DataTable().destroy(true);
  // }
  delete = (_id) => {
    new Apimanager()
      .patchroute(`v1/admin/tables`, { _id })
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
  GetTableData = () => {
    var { category_detail } = this.state;
    return category_detail.map((item) => {
      var status =
        item.status == "open"
          ? "open"
          : item.status == "close"
          ? "Seated"
          : item.status == "disable"
          ? "disable"
          : "";
      var id = item._id;
      return (
        <tr>
          <td>{item.tableNumber}</td>
          <td>{item.minSize}</td>
          <td>{item.size}</td>
          <td>{item.location}</td>
          <td>{status}</td>
          {status == "open" || status == "disable" ? (
            <td className="text-right">
              <Button
                style={{ marginRight: 8, width: 80 }}
                onClick={() => this.editrecord(id)}
                bsStyle="warning"
              >
                {status == "open" ? "Disable" : "open"}
              </Button>
            </td>
          ) : (
            <td className="text-right"></td>
          )}
          {status == "open" || status == "disable" ? (
            <td>
              <Button
                style={{ width: 70 }}
                onClick={() =>
                  this.setState({
                    alert: (
                      <SweetAlert
                        warning
                        style={{
                          display: "block",
                          marginTop: "100px",
                        }}
                        title={"Do you want to delete table!"}
                        onConfirm={() => this.delete(id)}
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
          ) : null}
        </tr>
      );
    });
  };
  render() {
    var { category_detail } = this.state;
    return (
      <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
        <div
          className="fresh-datatables"
          style={{
            width: "80%",
            marginLeft: "10%",
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
          <span style={{ marginLeft: "10%" }}></span>
          {category_detail && category_detail.length > 0 ? (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Table number</th>
                  <th>Minimum size</th>
                  <th>Maximum size</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Update Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{this.GetTableData()}</tbody>
            </Table>
          ) : (
            <h4>No data for Tables</h4>
          )}
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
