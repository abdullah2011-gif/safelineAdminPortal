import React from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from "../../NodeFunctions/Functions";
import { Grid, Row, Col, Modal, Table } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Card } from "components/Card/Card.jsx";
import Axios from "axios";
import moment from "moment";
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
      date: new Date(),
      day7: true,
    };
  }
  createTable = () => {
    console.log(this.state.location);
    new Apimanager()
      .postroute("v1/admin/reserved-table", {
        ...this.state,
      })
      .then((res) => {
        console.log(res);
        this.componentDidMount();
        this.setState({ size: null, tableNumber: null, modal: false });
      });
  };
  componentDidMount() {
    this.getData();
  }
  getData = (date) => {
    if (date) this.setState({ date });
    new Apimanager()
      .Getroute("v1/admin/reserved-table", {
        date: date ? date : moment(this.state.date).format("YYYY-MM-DD"),
        day7: this.state.day7,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          category_detail: res,
          day7: false,
        });
      });
  };
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
      .patchroute(`v1/admin/reserved-table`, { _id })
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
      var status = item.reservedStatus;
      var id = item._id;
      return (
        <tr>
          <td>
            {item.reservationReq
              ? moment(item.reservationReq.date).format("DD/MM/YYYY")
              : null}
          </td>
          <td>{item.tableNumber}</td>
          <td>{item.size}</td>
          <td>{item.amount}</td>
          <td>{item.location}</td>
          <td>{status == "reserved" ? "free" : status}</td>
          {/* {status == "booked" || status == "enteredBar" ? (
            <td className="text-right">
              <Button
                style={{ marginRight: 8, width: 130 }}
                onClick={() => this.editrecord(id)}
                bsStyle="warning"
              >
                {status == "booked" ? "Enter Party" : "Complete Party"}
              </Button>
            </td>
          ) : ( */}
          <td className="text-right">
            {status == "reserved" ? "Free" : status}
          </td>
          {/* )} */}
          {status == "reserved" && (
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
          )}
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
          <input
            type="date"
            min={moment().format("YYYY-MM-DD")}
            onChange={(evt) => this.getData(evt.target.value)}
          />
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
                  <th>Date</th>
                  <th>Table number</th>
                  <th>size</th>
                  <th>Amount</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Status</th>
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
                    title="Add Table"
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
                                label: "Table Price",
                                type: "number",
                                defaultValue: this.state.minSize,
                                bsClass: "form-control",
                                placeholder: "Table amount",
                                onChange: (evt) => {
                                  this.setState({
                                    amount: evt.target.value,
                                  });
                                },
                              },
                            ]}
                          />
                          <FormInputs
                            ncols={["col-md-6", "col-md-6"]}
                            properties={[
                              {
                                label: "Table Capacity",
                                type: "number",
                                bsClass: "form-control",
                                placeholder: "Table size",
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
                          <FormInputs
                            ncols={["col-md-6", "col-md-6"]}
                            properties={[
                              {
                                label: "Description",
                                type: "textarea",
                                componentClass: "textarea",
                                bsClass: "form-control",
                                placeholder: "Description",
                                defaultValue: this.state.size,
                                onChange: (evt) => {
                                  this.setState({
                                    description: evt.target.value,
                                  });
                                },
                              },
                              {
                                label: "Amount to Duplicate",
                                control: true,
                                defaultValue: this.state.size,
                                child: [
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                  "",
                                ].map((item, inde) => ({
                                  title: inde + 1,
                                  value: inde + 1,
                                })),
                                placeholder: "Location",
                                variant: "outline-secondary",
                                title: "Location",
                                id: "input-group-dropdown-2",
                                onChange: (evt) => {
                                  this.setState({
                                    number: evt.target.value,
                                  });
                                },
                              },
                            ]}
                          />
                          <FormInputs
                            ncols={["col-md-4", "col-md-4", "col-md-4"]}
                            properties={[
                              {
                                label: "Date",
                                type: "date",
                                // componentClass: "date",
                                bsClass: "form-control",
                                placeholder: "Date",
                                defaultValue: this.state.size,
                                onChange: (evt) => {
                                  console.log(new Date(evt.target.value));
                                  this.setState({
                                    date: new Date(evt.target.value),
                                  });
                                },
                              },
                              {
                                label: "Start Time",
                                type: "time",
                                // componentClass: "date",
                                bsClass: "form-control",
                                placeholder: "Start Time",
                                defaultValue: this.state.size,
                                onChange: (evt) => {
                                  this.setState({
                                    startTime: evt.target.value,
                                  });
                                },
                              },
                              {
                                label: "End Time",
                                type: "time",
                                // componentClass: "date",
                                bsClass: "form-control",
                                placeholder: "End Time",
                                defaultValue: this.state.size,
                                onChange: (evt) => {
                                  this.setState({
                                    endTime: evt.target.value,
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
