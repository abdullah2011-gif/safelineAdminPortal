import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/CustomButton/CustomButton";
import { Card } from "components/Card/Card.jsx";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import { Grid, Row, Col, Modal, Table } from "react-bootstrap";
import moment from "moment";
import Axios from "axios";
import config from "../../config";
function Line() {
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [tables, setTables] = useState([]);
  const [party, setParty] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const assignTable = (id) => {
    Axios.post(`${config.url}v1/admin/assignParty`, {
      tableId: id,
      partyId: party,
    })
      .then((res) => {
        setTables([]);
        setParty(null);
        setModal(false);
        getData();
      })
      .catch((e) => console.log(e));
  };
  const completeParty = (_id) => {
    new Apimanager().patchroute("v1/admin/party", { _id }).then((res) => {
      getData();
    });
  };
  const getData = () => {
    new Apimanager()
      .Getroute("v1/Admin/party", { status: "enteredBar" })
      .then((res) => {
        if (res && res.length > 0) setCustomers(res);
        else setCustomers([]);
      });
  };
  // console.log(customers);
  const GetTableData = () => {
    return customers.map((item, key) => {
      var cus = null;
      var index = null;
      if (item.customers && item.customers.length > 0) {
        index = item.customers.findIndex(
          (item) => item.customer && item.customer.partyOwner
        );
        if (index)
          cus =
            item.customers &&
            item.customers[index] &&
            item.customers[index].customer &&
            item.customers[index].customer.fullName;
      }
      var tableNumber = item.table ? item.table.tableNumber : "";
      var id = item._id ? item._id : "";
      return (
        <tr>
          <td>{cus ? cus : ""}</td>
          <td>
            {item.customers && item.customers.length > 0
              ? item.customers.length
              : ""}
          </td>
          <td>
            {item.createdAt ? moment(item.createdAt).format("hh-mm A") : ""}
          </td>
          <td>{tableNumber}</td>
          <td>{item.table ? item.table.location : ""}</td>
          <td>
            {item.table
              ? item.table.status == "alloted"
                ? "Assigned"
                : item.table.status == "confirm"
                ? "Confirmed"
                : "Waiting"
              : "Waiting"}
          </td>
          <td>
            {item.customers &&
              item.customers.map((i, index) => {
                var string = i && i.customer && i.customer.fullName;
                string = index > 0 ? ", " + string : string;
                return string;
              })}
          </td>
          <td>
            <Button
              style={{ marginRight: 8, width: 115 }}
              onClick={() => {
                completeParty(id);
              }}
              bsStyle="danger"
            >
              Exit
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#ffffff" }}>
      <div
        className="fresh-datatables"
        style={{
          width: "100%",
          backgroundColor: "#f9f9f9",
          padding: 15,
        }}
      >
        {customers && customers.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>PARTY OWNER</th>
                <th>NO OF CUSTOMERS</th>
                <th>TIME</th>
                <th>TABLE NUMBER</th>
                <th>TABLE LOCATION</th>
                <th>STATUS</th>
                <th>PARTICIPANTS</th>
              </tr>
            </thead>
            <tbody>{GetTableData()}</tbody>
          </Table>
        ) : (
          <h4>No data for Parties</h4>
        )}
        <Row></Row>
      </div>
      <Modal show={modal}>
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Participants"
                  content={
                    <form>
                      <Row>
                        {console.log(tables)}
                        <Row>
                          <Col sm md lg={2}>
                            <label style={{ fontWeight: "bold" }}>
                              Table #
                            </label>
                          </Col>
                          <Col sm md lg={2}>
                            <label style={{ fontWeight: "bold" }}>Status</label>
                          </Col>
                          <Col sm md lg={2}>
                            <label style={{ fontWeight: "bold" }}>
                              Location
                            </label>
                          </Col>
                          <Col sm md lg={2}>
                            <label style={{ fontWeight: "bold" }}>
                              Minimum Size
                            </label>
                          </Col>
                          <Col sm md lg={2}>
                            <label style={{ fontWeight: "bold" }}>
                              Maximum size
                            </label>
                          </Col>
                        </Row>
                        {tables &&
                          tables.length > 0 &&
                          tables.map((item, i) => {
                            return (
                              <Row>
                                <Col sm md lg={2}>
                                  <label style={{ textAlign: "center" }}>
                                    {item.tableNumber}
                                  </label>
                                </Col>
                                <Col sm md lg={2}>
                                  <label>{item.status}</label>
                                </Col>
                                <Col sm md lg={2}>
                                  <label>{item.location}</label>
                                </Col>
                                <Col sm md lg={2}>
                                  <label>{item.minSize}</label>
                                </Col>
                                <Col sm md lg={2}>
                                  <label>{item.size}</label>
                                </Col>
                                <Col sm md lg={2}>
                                  <Button onClick={() => assignTable(item._id)}>
                                    Assign
                                  </Button>
                                </Col>
                              </Row>
                            );
                          })}

                        <Button
                          style={{ marginLeft: "46%" }}
                          bsStyle="warning"
                          onClick={() => {
                            setModal(false);
                            setTables([]);
                            setParty(null);
                          }}
                        >
                          Close
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
      {alert}
    </div>
  );
}

export default Line;
