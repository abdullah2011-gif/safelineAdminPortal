import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/CustomButton/CustomButton";
import { Card } from "components/Card/Card.jsx";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Grid, Row, Col, Modal } from "react-bootstrap";
import moment from "moment";
import $ from "jquery";
import Axios from "axios";
import config from "../../config";

import io from "socket.io-client";

var socket = io(`${config.url}`);
require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");

function Closeit() {
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [isDatableInitialize, setIsDatableInitialize] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [tables, setTables] = useState([]);
  const [party, setParty] = useState(null);
  const main = useRef(null);
  const calculateAge = (age) => {
    var a = moment();
    var c = moment(age).format("DD/MM/YYYY").slice(6, 10);
    var b = moment(c, "YYYY");
    var diff = a.diff(b, "years"); // calculates patient's age in years
    return diff; // this prints out the age
  };
  useEffect(() => {
    socket.on("cancheckbaropen", () => {
      console.log(
        "========================socket event in confirm wating============================================"
      );
      new Apimanager().Getroute("Admin/party/detail").then((res) => {
        // console.log(res);
        setCustomers(res);
      });
    });
    return () => {
      socket.removeListener();
    };
  }, []);
  const editrecord = (prop) => {
    new Apimanager().PutrouteByid("admin/bumpup/" + prop[0]).then((res) => {
      if (res.data)
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
      new Apimanager().Getroute("Admin/party/detail").then((res) => {
        setCustomers(res);
      });
    });
  };
  useEffect(() => {
    new Apimanager().Getroute("Admin/party/detail").then((res) => {
      // console.log(res);
      setCustomers(res);
      try {
        if (!isDatableInitialize) {
          $("#datatable").DataTable({
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
          setIsDatableInitialize(true);
        }
      } catch (error) {
        console.log(error);
      }
    });
    return () => {
      try {
        $(".data-table-wrapper").find("table").DataTable().destroy(true);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  const getTables = (len, id) => {
    Axios.patch(`${config.url}admin/party/detail`, { len })
      .then((res) => {
        setTables(res.data);
        setModal(true);
        setParty(id);
      })
      .catch((e) => console.log(e));
  };
  const assignTable = (id) => {
    Axios.post(`${config.url}admin/assignParty`, { table: id, party: party })
      .then((res) => {
        setTables([]);
        setParty(null);
        setModal(false);
      })
      .catch((e) => console.log(e));
  };
  const deleteTable = (id) => {
    Axios.put(`${config.url}admin/party/detail`, { id })
      .then((res) => {})
      .catch((e) => console.log(e.response.data));
  };
  // console.log(customers);
  var dataTable = {
    headerRow: [
      "",
      "party Owner",
      "no of customers",
      "time",
      "Table Number",
      "Table Location",
      "Status",
      "Participants",
    ],
    dataRows: customers.map((item, i) => {
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
        // if (index) cus = item.customers[index].customer.fullName;
      }
      return [
        item.partyId ? item.partyId : "",
        cus ? cus : "",
        item.customers && item.customers.length > 0
          ? item.customers.length
          : "",
        item.createdAt ? moment(item.createdAt).format("hh-mm A") : "",
        item.table ? item.table.tableNumber : "",
        item.table ? item.table.location : "",
        item.table ? "Alloted" : "Waiting",
      ];
    }),
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
        <table
          scrollX={true}
          id="datatable"
          ref={main}
          onScroll={true}
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
              <th style={{ fontWeight: "bold", color: "#000000" }}>
                {dataTable.headerRow[8]}
              </th>
              <th style={{ fontWeight: "bold", color: "#000000" }}>
                {dataTable.headerRow[9]}
              </th>
            </tr>
          </thead>
          <tbody>
            {dataTable.dataRows.map((prop, key) => {
              return (
                <tr key={key}>
                  {prop.map((prop, key) => {
                    return <td key={key}>{key == 0 ? "" : prop}</td>;
                  })}
                  {/* {console.log(customer)} */}
                  <td style={{ width: "20%" }} className="text-right">
                    {customers &&
                      customers[key] &&
                      customers[key].customers &&
                      customers[key].customers.length > 0 &&
                      customers[key].customers.map((item, index) => {
                        console.log(item + "item");
                        return (
                          <label>
                            {index != 0 && ", "}
                            {item && item.customer && item.customer.fullName}
                          </label>
                        );
                      })}
                  </td>
                  <td>
                    {prop[5] == "" && (
                      <Button
                        style={{ marginRight: 8, width: 115 }}
                        onClick={() => {
                          var len =
                            customers &&
                            customers[key] &&
                            customers[key].customers &&
                            customers[key].customers.length;
                          if (len) getTables(len, prop[0]);
                          // setCustomer(customers[key].customers);
                          // setModal(true);
                        }}
                        bsStyle="warning"
                      >
                        Assign Table
                      </Button>
                    )}
                  </td>
                  <td>
                    {
                      <Button
                        style={{ marginRight: 8, width: 115 }}
                        onClick={() => {
                          deleteTable(prop[0]);
                          // setCustomer(customers[key].customers);
                          // setModal(true);
                        }}
                        bsStyle="danger"
                      >
                        Delete
                      </Button>
                    }
                  </td>
                  <td className="text-right">
                    {prop[5] == "" && (
                      <Button
                        style={{ marginRight: 8, width: 90 }}
                        onClick={() => editrecord(prop, key)}
                        bsStyle="warning"
                      >
                        Bump up
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* {console.log(isBarOpen + " " + isLineOpen)} */}
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

export default Closeit;
