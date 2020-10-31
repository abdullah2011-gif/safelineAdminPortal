import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";
import $ from "jquery";

require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");

function Closeit(props) {
  const [alert, setAlert] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isDatableInitialize, setIsDatableInitialize] = useState(false);
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

  const calculateAge = (age) => {
    var a = moment();
    var b = moment(age, "DD/MM/YYYY");
    var diff = a.diff(b, "years");
    return diff;
  };
  var dataTable = {
    headerRow: [
      "Date",
      "Customer Name",
      "age",
      "User Name",
      "Enter Time",
      "Exit Time",
    ],
    dataRows: employees.map((item) => [
      (item.createdAt && moment(item.createdAt).format("DD/MM/YYYY")) || "",
      (item.customer && item.customer.fullName && item.customer.fullName) || "",
      (item.customer &&
        item.customer.dateOfBirth &&
        calculateAge(item.customer.dateOfBirth)) ||
        "",
      (item.customer && item.customer.username && item.customer.username) || "",
      (item.createdAt && moment(item.createdAt).format("hh-mm A")) || "",
      (item.party &&
        item.party.exitBarTime &&
        moment(item.party.exitBarTime).format("hh-mm A")) ||
        "",
    ]),
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
                    return <td key={key}>{prop}</td>;
                  })}
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
