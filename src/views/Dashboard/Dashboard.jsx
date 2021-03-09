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
  const [customers, setCustomers] = useState([]);
  const [isVip, setIsVip] = useState(null);
  const [amount, setAmount] = useState(null);
  const [barStatus, setbarStatus] = useState("open");
  const [remainingCap, setRemainingCap] = useState(null);
  const [totalCap, setTotalCap] = useState(null);
  const getDetail = () => {
    new Apimanager().Getroute("v1/admin/bardetail").then((res) => {
      if (res) {
        setTotalCap(res.totalCapacity);
        setRemainingCap(res.remainigCapacity);
      }
    });
    new Apimanager().postroute("v1/auth/admin").then((res) => {
      var { data } = res || {};
      if (data) {
        setIsCard(data.amount == 0 ? true : false);
        setIsVip(data.vip);
        setbarStatus(data.barStatus);
      }
    });
  };
  useEffect(() => {
    getDetail();
  }, []);
  const unSetCard = (i) => {
    if (i) {
      new Apimanager().postroute("v1/Admin/detail", { ...i }).then((res) => {
        getDetail();
      });
    } else {
      new Apimanager()
        .postroute("v1/Admin/detail", { amount: "0" })
        .then((res) => {
          getDetail();
        });
    }
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
    new Apimanager().postroute("v1/Admin/detail", { amount }).then((res) => {
      setModal1(false);
      getDetail();
    });
  };

  const openBar = () => {
    new Apimanager().PutrouteByid("v1/admin/bar").then((res) => {
      if (res.data)
        setAlert(
          (alert) =>
            (alert = (
              <SweetAlert
                warning
                style={{ display: "block", marginTop: "100px" }}
                title={res.data.message}
                onConfirm={() => setAlert(null)}
                onCancel={() => setAlert(null)}
                confirmBtnBsStyle="warning"
              ></SweetAlert>
            ))
        );
      getDetail();
    });
  };
  const closeBar = () => {
    new Apimanager().postroute("v1/admin/bar").then((res) => {
      if (res.data)
        setAlert(
          (alert) =>
            (alert = (
              <SweetAlert
                warning
                style={{ display: "block", marginTop: "100px" }}
                title={res.data.message}
                onConfirm={() => setAlert(null)}
                onCancel={() => setAlert(null)}
                confirmBtnBsStyle="warning"
              ></SweetAlert>
            ))
        );
      getDetail();
    });
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          paddingLeft: "14%",
          paddingTop: "2%",
          paddingBottom: "2%",
        }}
      >
        <span>
          <Button
            style={{
              marginTop: 20,
              marginBottom: 20,
              width: 120,
            }}
            onClick={openBar}
            bsStyle="warning"
          >
            Open bar
          </Button>
        </span>{" "}
        <span style={{ marginLeft: "10%" }}>
          <Button
            style={{ marginLeft: "5%", width: 120 }}
            onClick={closeBar}
            bsStyle="warning"
          >
            Close bar
          </Button>
        </span>
        <span style={{ marginLeft: "10%" }}>
          {!isVip ? (
            <Button
              bsStyle="warning"
              onClick={() => unSetCard({ vip: "true" })}
            >
              Set entry for VIP
            </Button>
          ) : (
            <Button
              bsStyle="warning"
              onClick={() => unSetCard({ vip: "false" })}
            >
              Set entry for all
            </Button>
          )}
        </span>
        <span style={{ marginLeft: "10%" }}>
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
            <Button bsStyle="warning" onClick={() => unSetCard(null)}>
              Disable Cover Charges
            </Button>
          )}
        </span>
        <h4
          style={{
            textAlign: "center",
            marginRight: "10%",
            backgroundColor: "white",
          }}
        >
          {!barStatus ? "Bar is currently closed" : "Bar is currently open"}
        </h4>
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
          <div>
            <span>Total Capacity: {totalCap}</span>
            <span style={{ marginLeft: "10%" }}>
              Current Capacity: {remainingCap}
            </span>
          </div>
          {/* <table
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
              </tr>
            </thead>
            <tbody>
              {dataTable.dataRows.map((prop, key) => {
                return (
                  <tr key={key}>
                    {prop.map((prop, key) => {
                      return <td key={key}>{key == 0 ? "" : prop}</td>;
                    })}
                    <td style={{ width: "40%" }} className="text-right">
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
          </table> */}
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
                          {customer &&
                            customer.length > 0 &&
                            customer.map((item, i) => {
                              if (
                                item &&
                                item.customer &&
                                item.customer.fullName
                              )
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
