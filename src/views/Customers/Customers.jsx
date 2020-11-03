import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import $ from "jquery";
require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");

function Closeit(props) {
  const [alert, setAlert] = useState(null);
  const [isDatableInitialize, setIsDatableInitialize] = useState(false);
  const [customers, setCustomers] = useState([]);
  const main = useRef(null);
  const calculateAge = (age) => {
    var a = moment();
    var b = moment(age, "DD/MM/YYYY");
    var diff = a.diff(b, "years");
    return diff;
  };
  const editrecord = (prop) => {
    new Apimanager()
      .PutrouteByid("admin/vipcustomer/" + prop[0])
      .then((res) => {
        if (res.data)
          setAlert(
            <SweetAlert
              success
              style={{ display: "block", marginTop: "100px" }}
              title={res.data.message}
              onConfirm={() => setAlert(null)}
              onCancel={() => setAlert(null)}
              confirmBtnBsStyle="warning"
              showCancel={true}
            ></SweetAlert>
          );
        new Apimanager().Getroute("customer/detail").then((res) => {
          setCustomers(res);
        });
      });
  };
  useEffect(() => {
    new Apimanager().Getroute("customer/detail/limit").then((res) => {
      setCustomers(res);
    });
    new Apimanager().Getroute("customer/detail").then((res) => {
      // res.shift();
      setCustomers(res);
      try {
        if (!isDatableInitialize) {
          $("#tab").DataTable({
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
  var dataTable = {
    headerRow: [
      "Customer Id",
      "Full Name",
      "Email",
      "age",
      "Vip status",
      "Phone",
      "Greek Organization",
    ],
    dataRows: customers.map((item, i) => [
      item.customerId,
      item.fullName,
      item.email,
      calculateAge(item.dateOfBirth),
      item.vip ? "true" : "false",
      item.phone,
      item.greek,
    ]),
  };
  const edit = (prop, key) => {
    props.history.push({
      pathname: `/admin/addcustomer`,
      data: customers[key], // your data array of objects
    });
  };
  const deleteRec = async (id) => {
    const i = customers.findIndex((i) => i.customerId == id);
    await new Apimanager().deleterouteByid(
      "customer/detail/" + customers[i]._id
    );
    new Apimanager().Getroute("customer/detail").then((res) => {
      setAlert(null);
      setCustomers(res);
    });
  };

  const modalVisible = (id) => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "100px" }}
        title={`Are you Sure You Want To Delete Record Of ID ${id} !`}
        onConfirm={() => deleteRec(id)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="Danger"
        showCancel
        confirmBtnText="Yes"
      ></SweetAlert>
    );
  };
  return (
    <div style={{ width: "100%", backgroundColor: "#ffffff" }}>
      <div
        className="fresh-datatables"
        style={{
          width: "90%",
          backgroundColor: "#f9f9f9",
          marginLeft: "5%",
          padding: 15,
        }}
      >
        <table
          scrollX={true}
          id="tab"
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
                    return <td key={key}>{prop}</td>;
                  })}
                  <td>
                    <Button
                      style={{ marginRight: 8, width: 90 }}
                      onClick={() => editrecord(prop, key)}
                      bsStyle="warning"
                    >
                      {prop[4] == "false" ? "make vip" : "revert"}
                    </Button>
                  </td>
                  <td>
                    <Button
                      style={{ marginRight: 8, width: 90 }}
                      onClick={() => edit(prop, key)}
                      bsStyle="warning"
                    >
                      {"Edit"}
                    </Button>
                  </td>
                  <td>
                    <Button
                      style={{ marginRight: 8, width: 90 }}
                      onClick={() => modalVisible(prop[0])}
                      bsStyle="warning"
                    >
                      {"Delete"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {alert}
    </div>
  );
}

export default Closeit;
