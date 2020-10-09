import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/CustomButton/CustomButton";
import { Card } from "components/Card/Card.jsx";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import {
  Grid,
  Row,
  Col,
  Modal,
  Image,
  DropdownButton,
  MenuItem,
} from "react-bootstrap";
import moment from "moment";
import $ from "jquery";
import { CardBody } from "reactstrap";
require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");

function Closeit() {
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [isDatableInitialize, setIsDatableInitialize] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [totalCap, setTotalCap] = useState(null);
  const [amount, setAmount] = useState(null);
  const [remainingCap, setRemainingCap] = useState(null);
  const main = useRef(null);
  useEffect(() => {
    new Apimanager().Getroute("Admin/bardetail").then((res) => {
      setTotalCap(res.totalCapacity);
      setRemainingCap(res.remainigCapacity);
    });
    new Apimanager().Getroute("Admin/detail/card").then((res) => {
      setIsCard(!res.success);
    });
    new Apimanager().Getroute("Admin/bardetail/all").then((res) => {
      console.log(res);
      setCustomers(res);

      if (!isDatableInitialize) {
        $("datatables").DataTable({
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
      "Enter Time",
      "Exit Time",
    ],
    dataRows: customers.map((item, i) => {
      var cus = null;
      var index = null;
      if (item.customers && item.customers.length > 0) {
        index = item.customers.findIndex(
          (item) => item.customer && item.customer.partyOwner
        );
        if (index) cus = item.customers[index].customer.fullName;
      }
      return [
        item.partyId ? item.partyId : "",
        cus ? cus : "",
        item.customers && item.customers.length > 0
          ? item.customers.length
          : "",
        item.createdAt ? moment(item.enteredBarTime).format("HH-mm") : "",
        item.createdAt ? moment(item.exitBarTime).format("HH-mm") : "",
      ];
    }),
  };
  const unSetCard = () => {
    new Apimanager()
      .postroute("Admin/detail/card", { amount: null, payment: false })
      .then((res) => {
        setIsCard(true);
      });
  };
  const setCard = () => {
    if (!amount) {
      setAlert(
        (alert) =>
          (alert = (
            <SweetAlert
              warning
              style={{ display: "block", marginTop: "100px" }}
              title={"Please Enter Amount"}
              onConfirm={() => setAlert(null)}
              onCancel={() => setAlert(null)}
              confirmBtnBsStyle="warning"
            ></SweetAlert>
          ))
      );
      return;
    }
    new Apimanager()
      .postroute("Admin/detail/card", { amount, payment: true })
      .then((res) => {
        setIsCard(false);
        setModal1(false);
      });
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          paddingLeft: "15%",
          paddingTop: "2%",
          paddingBottom: "2%",
        }}
      >
        <span>Total Capacity: {totalCap}</span>
        <span style={{ marginLeft: "25%" }}>
          Remaining Capacity: {remainingCap}
        </span>
        <span style={{ marginLeft: "25%" }}>
          {isCard ? (
            <Button
              bsStyle="warning"
              onClick={() => {
                setModal1(true);
              }}
            >
              Set Cover Charges
            </Button>
          ) : (
            <Button bsStyle="warning" onClick={unSetCard}>
              Disable Cover Charges
            </Button>
          )}
        </span>
      </div>
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
              </tr>
            </thead>
            <tbody>
              {dataTable.dataRows.map((prop, key) => {
                return (
                  <tr key={key}>
                    {prop.map((prop, key) => {
                      return <td key={key}>{key == 0 ? "" : prop}</td>;
                    })}
                    <td className="text-right">
                      <Button
                        style={{ marginRight: 8, width: 115 }}
                        onClick={() => {
                          setCustomer(customers[key].customers);
                          setModal(true);
                        }}
                        bsStyle="warning"
                      >
                        Participants
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
                          {customer.map((item, i) => {
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
                          })}

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
        <Modal show={modal1}>
          <div className="content">
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Card
                    title="Card Detail"
                    content={
                      <div className="content">
                        <Grid fluid>
                          <Row>
                            <Col md={12}>
                              <Card
                                content={
                                  <form>
                                    <Row>
                                      <FormInputs
                                        ncols={["col-md-6"]}
                                        properties={[
                                          {
                                            label: "Amont",
                                            type: "number",
                                            bsClass: "form-control",
                                            placeholder: "Amont",
                                            defaultValue: amount,
                                            // .tableNumber,
                                            onChange: (evt) => {
                                              setAmount(evt.target.value);
                                            },
                                          },
                                        ]}
                                      />
                                      <Col></Col>
                                      <Button
                                        style={{ marginLeft: "35%" }}
                                        bsStyle="warning"
                                        onClick={() => setModal1(false)}
                                      >
                                        Close
                                      </Button>
                                      <Button
                                        style={{ marginLeft: "5%" }}
                                        bsStyle="warning"
                                        onClick={setCard}
                                      >
                                        Set Amount
                                      </Button>
                                    </Row>
                                  </form>
                                }
                              />
                            </Col>
                          </Row>
                        </Grid>
                      </div>
                    }
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        </Modal>
        {alert}
      </div>
    </>
  );
}

export default Closeit;
