import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/CustomButton/CustomButton";
import { Card } from "components/Card/Card.jsx";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Grid, Row, Col, Modal } from "react-bootstrap";
import moment from "moment";
import $ from "jquery";
require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");

function Closeit() {
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [isDatableInitialize, setIsDatableInitialize] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [isLineOpen, setIsLineOpen] = useState(false);
  const [isBarOpen, setIsBarOpen] = useState(false);
  const main = useRef(null);
  const calculateAge = (age) => {
    var a = moment();
    var c = moment(age).format("DD/MM/YYYY").slice(6, 10);
    var b = moment(c, "YYYY");
    var diff = a.diff(b, "years"); // calculates patient's age in years
    return diff; // this prints out the age
  };
  useEffect(() => {
    new Apimanager().Getroute("Admin/party/detailconfirmed").then((res) => {
      if (res && res.length > 0) setCustomers(res);
      if (!isDatableInitialize) {
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
        setIsDatableInitialize(true);
      }
    });

    return () => {
      $(".data-table-wrapper").find("table").DataTable().destroy(true);
    };
  }, []);
  console.log(customers);
  var dataTable = {
    headerRow: [
      "",
      "party Owner",
      "no of customers",
      "time",
      "Table Status",
      "Table Number",
      "Table Location",
      "Participants",
    ],
    dataRows: customers.map((item, i) => {
      var cus = null;
      var index = null;
      if (item && item.customers && item.customers.length > 0) {
        index = item.customers.findIndex(
          (item) => item.customer && item.customer.partyOwner
        );
        if (index)
          cus =
            item &&
            item.customers[index] &&
            item.customers[index].customer.fullName;
      }
      return [
        item.partyId ? item.partyId : "",
        cus ? cus : "",
        item && item.customers && item.customers.length > 0
          ? item.customers.length
          : "",
        item.createdAt ? moment(item.createdAt).format("hh-mm A") : "",
        item.table ? item.table.status : "",
        item.table ? item.table.tableNumber : "",
        item.table ? item.table.location : "",
      ];
    }),
  };
  return (
    <div style={{ width: "100%", backgroundColor: "#ffffff" }}>
      <div
        className="fresh-datatables"
        style={{
          width: "70%",
          backgroundColor: "#f9f9f9",
          marginLeft: "15%",
          padding: 15,
        }}
      >
        <table
          scrollX={true}
          id="datatables"
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
            </tr>
          </thead>
          <tbody>
            {dataTable.dataRows.map((prop, key) => {
              return (
                <tr key={key}>
                  {prop.map((prop, key) => {
                    return <td key={key}>{key == 0 ? "" : prop}</td>;
                  })}
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
                    {/* <Button
                      style={{ marginRight: 8, width: 115 }}
                      onClick={() => {
                        setCustomer(customers[key].customers);
                        setModal(true);
                      }}
                      bsStyle="warning"
                    >
                      Participants
                    </Button> */}
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
                        <Row>
                          <Col sm md lg={2} />
                          <Col sm md lg={2}>
                            <label style={{ fontWeight: "bold" }}>#</label>
                          </Col>
                          <Col sm md lg={4}>
                            <label style={{ fontWeight: "bold" }}>
                              customer name
                            </label>
                          </Col>
                          <Col>
                            <label style={{ fontWeight: "bold" }}>
                              Vip status
                            </label>
                          </Col>
                        </Row>
                        {/* {customer.map((item, i) => {
                          if (item && item.customer && item.customer.fullName)
                            return (
                              <Row>
                                <Col sm md lg={2} />
                                <Col sm md lg={2}>
                                  <label style={{ textAlign: "center" }}>
                                    {i + 1}
                                  </label>
                                </Col>
                                <Col sm md lg={4}>
                                  <label>{item.customer.fullName}</label>
                                </Col>
                                <Col>
                                  <label>
                                    {item.customer.vip
                                      ? "vip customer"
                                      : "regular customer"}
                                  </label>
                                </Col>
                              </Row>
                            );
                        })} */}

                        <Button
                          style={{ marginLeft: "46%" }}
                          bsStyle="warning"
                          onClick={() => {
                            setModal(false);
                            setCustomer([]);
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
