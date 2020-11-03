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
  const [isDatableInitialize, setIsDatableInitialize] = useState(false);
  const [employees, setEmployees] = useState([]);
  const main = useRef(null);
  useEffect(() => {
    new Apimanager().Getroute("admin/party/entries").then((res) => {
      console.log(res);
      setEmployees(res);
      try {
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
      "Date",
      "Customer Name",
      "Email",
      "Phone Number",
      "Enter Time",
      "Exit Time",
    ],
    dataRows: employees.map((item) => [
      (item.createdAt && moment(item.createdAt).format("MM/DD/YYYY")) || "",
      (item.customer && item.customer.fullName && item.customer.fullName) || "",
      (item.customer && item.customer.email && item.customer.email) || "",
      (item.customer && item.customer.phone && item.customer.phone) || "",
      (item.createdAt && moment(item.createdAt).format("hh-mm A")) || "",
      (item.party &&
        item.party.exitBarTime &&
        moment(item.party.exitBarTime).format("hh-mm A")) ||
        "",
    ]),
  };
  return (
    <>
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
              </tr>
            </thead>
            <tbody>
              {dataTable.dataRows.map((prop, key) => {
                return (
                  <tr key={key}>
                    {prop.map((prop, key) => {
                      return <td key={key}>{key == 0 ? "" : prop}</td>;
                    })}
                    {/* <td style={{ width: "40%" }} className="text-right">
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
                    </td> */}
                    {/* <td className="text-right">
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
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Row></Row>
        </div>
        {alert}
      </div>
    </>
  );
}

export default Closeit;
