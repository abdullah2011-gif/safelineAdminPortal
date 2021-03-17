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
      date: new Date(),
      day7: true,
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = (date) => {
    if (date) this.setState({ date });
    new Apimanager()
      .Getroute("v1/admin/reserved-parties", {
        date: date ? date : moment(this.state.date).toDate(),
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
  enterParty = (_id) => {
    new Apimanager().postroute("v1/admin/party", { _id }).then((res) => {
      this.getData();
    });
  };
  completeParty = (_id) => {
    new Apimanager().patchroute("v1/admin/party", { _id }).then((res) => {
      this.getData();
    });
  };
  deleteTable = (_id) => {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    Axios.put(
      `${config.url}v1/admin/party`,
      { _id },
      {
        headers: { Authorization: user && "Bearer " + user.token },
      }
    )
      .then((res) => {
        this.getData();
      })
      .catch((e) => console.log(e.response.data));
  };
  GetTableData = (category_detail) => {
    return category_detail.map((item) => {
      var status = item.reservationStatus;
      return (
        <tr>
          <td>
            {item.reservationDate
              ? moment(item.reservationDate).format("DD/MM/YYYY")
              : null}
          </td>
          <td>{item.table[0] && item.table[0].tableNumber}</td>
          <td>{item.table[0] && item.table[0].size}</td>
          <td>{item.table[0] && item.table[0].amount}</td>
          <td>{item.table[0] && item.table[0].location}</td>
          <td>{item.cardUser[0] && item.cardUser[0].fullName}</td>
          <td>{item.cardUser[0] && item.cardUser[0].phone}</td>
          <td>
            <Button
              onClick={() =>
                window.open(
                  item.transInfo.receipt_url,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              View recipt
            </Button>
          </td>
          {(status == "reserved" || status == "enteredBar") && (
            <td>
              <Button
                onClick={() =>
                  status == "enteredBar"
                    ? this.completeParty(item._id)
                    : this.enterParty(item._id)
                }
                bsStyle="success"
              >
                {status == "enteredBar" ? "Complete Party" : "Enter party"}
              </Button>
            </td>
          )}
          {status == "reserved" && (
            <td>
              <Button
                onClick={() => this.deleteTable(item._id)}
                bsStyle="success"
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
          <span style={{ marginLeft: "10%" }}></span>
          {category_detail && category_detail.length > 0 ? (
            category_detail.map((item) => {
              return (
                <>
                  <h4>{item._id == "reserved" ? "Queue" : item._id}</h4>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Table number</th>
                        <th>size</th>
                        <th>Amount</th>
                        <th>Location</th>
                        <th>Owner</th>
                        <th>Owner Phone</th>
                        <th>Recipt</th>
                        {item._id == "reserved" && <th>Enter party</th>}
                        {item._id == "enteredBar" && <th>Complete party</th>}
                      </tr>
                    </thead>
                    <tbody>{this.GetTableData(item.data)}</tbody>
                  </Table>
                </>
              );
            })
          ) : (
            <h4>No data for Parties</h4>
          )}
        </div>
        {this.state.alert}
      </div>
    );
  }
}

export default Closeit;
