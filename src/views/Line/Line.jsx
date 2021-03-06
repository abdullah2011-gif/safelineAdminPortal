import React, { useState, useEffect, useRef, useCallback } from "react";
import Button from "../../components/CustomButton/CustomButton";
import { Card } from "components/Card/Card.jsx";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import { Grid, Row, Col, Modal, Table } from "react-bootstrap";
import moment from "moment";
import Axios from "axios";
import config from "../../config";

import io from "socket.io-client";

var socket = io(`${config.url}`);

function Line() {
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [tables, setTables] = useState([]);
  const [party, setParty] = useState(null);
  useEffect(() => {
    var lis = socket.on("admin", () => {
      console.log("------------------called--------------");
      getData();
    });
    // return () => {
    //   lis.removeListener();
    // };
  }, []);
  const editrecord = (_id) => {
    console.log(_id);
    new Apimanager().PutrouteByid("v1/admin/bumpup", { _id }).then((res) => {
      if (res && res.data)
        setAlert(
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "100px" }}
            title={res.data.message}
            onConfirm={() => setAlert(null)}
            onCancel={() => setAlert(null)}
            confirmBtnBsStyle="warning"
            showCancel={true}
          ></SweetAlert>
        );
      getData();
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const getTables = (len, id) => {
    new Apimanager()
      .Getroute("v1/admin/tables", { size: len, status: "open" })
      .then((res) => {
        setTables(res && res.length > 0 ? res : []);
        setModal(true);
        setParty(id);
      })
      .catch((e) => console.log(e));
  };
  const assignTable = (id) => {
    console.log({
      tableId: id,
      partyId: party,
    });
    new Apimanager()
      .postroute("v1/admin/assignParty", {
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
  const deleteTable = (_id) => {
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
        getData();
      })
      .catch((e) => console.log(e.response.data));
  };
  const getData = () => {
    new Apimanager()
      .Getroute("v1/Admin/party", { getInLine: true })
      .then((res) => {
        if (res && res.length > 0) setCustomers(res);
        else setCustomers([]);
      });
  };
  const enterParty = (_id) => {
    new Apimanager().postroute("v1/admin/party", { _id }).then((res) => {
      console.log(res);
      getData();
    });
  };
  const GetTableData = useCallback(() => {
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
            item.customers[index].customer;
      }
      var tableNumber = item.table ? item.table.tableNumber : "";
      var id = item._id ? item._id : "";
      return (
        <tr>
          <td>{cus ? cus.fullName : ""}</td>
          <td>{cus ? cus.phone : ""}</td>
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
            {item.desireTime ? moment(item.desireTime).format("hh-mm A") : ""}
          </td>
          {tableNumber == "" && (
            <td>
              <Button
                style={{ marginRight: 8, width: 115 }}
                onClick={() => {
                  var len =
                    customers &&
                    customers[key] &&
                    customers[key].customers &&
                    customers[key].customers.length;
                  if (len) getTables(len, id);
                }}
                bsStyle="warning"
              >
                Assign Table
              </Button>
            </td>
          )}
          <td>
            <Button
              style={{ marginRight: 8, width: 115 }}
              onClick={() => {
                deleteTable(id);
              }}
              bsStyle="danger"
            >
              Delete
            </Button>
          </td>
          {item.status == "confirmed" && (
            <td>
              <Button
                style={{ marginRight: 8, width: 115 }}
                onClick={() => enterParty(id)}
                bsStyle="danger"
              >
                Enter Party
              </Button>
            </td>
          )}
          {tableNumber == "" && (
            <td className="text-right">
              <Button
                style={{ marginRight: 8, width: 90 }}
                onClick={() => editrecord(id)}
                bsStyle="warning"
              >
                Bump up
              </Button>
            </td>
          )}
        </tr>
      );
    });
  }, [customers]);

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
                <th>OWNER PHONE</th>
                <th>NO OF CUSTOMERS</th>
                <th>TIME</th>
                <th>TABLE NUMBER</th>
                <th>TABLE LOCATION</th>
                <th>STATUS</th>
                <th>PARTICIPANTS</th>
                <th>DESIRE TIME</th>
              </tr>
            </thead>
            <tbody>{GetTableData(customers)}</tbody>
          </Table>
        ) : (
          <h4>No data for line</h4>
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
