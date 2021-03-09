import React, { useState, useEffect, useRef } from "react";
import Apimanager from "../../NodeFunctions/Functions";
import { Row, Table } from "react-bootstrap";
import moment from "moment";
import PaginationComponent from "react-reactstrap-pagination";

function Closeit() {
  const [alert, setAlert] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    new Apimanager()
      .Getroute("v1/admin/entries", { skip: page, limit: 10 })
      .then((res) => {
        console.log(res);
        if (res) {
          setEmployees(res.entries);
          setTotal(res.count);
        }
      });
  }, [page]);
  const GetTableData = () => {
    return employees.map((item, key) => {
      return (
        <tr>
          <td>
            {(item.createdAt && moment(item.createdAt).format("MM/DD/YYYY")) ||
              ""}
          </td>
          <td>
            {(item.customer &&
              item.customer.fullName &&
              item.customer.fullName) ||
              ""}
          </td>
          <td>
            {(item.customer && item.customer.email && item.customer.email) ||
              ""}
          </td>
          <td>
            {(item.customer && item.customer.phone && item.customer.phone) ||
              ""}
          </td>
          <td>
            {(item.party &&
              item.party.enteredBarTime &&
              moment(item.party.enteredBarTime).format("hh-mm A")) ||
              ""}
          </td>
          <td>
            {(item.createdAt && moment(item.createdAt).format("hh-mm A")) || ""}
          </td>
        </tr>
      );
    });
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
          {employees && employees.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Enter Time</th>
                  <th>Exit Time</th>
                </tr>
              </thead>
              <tbody>{GetTableData()}</tbody>
            </Table>
          ) : (
            <h4>No data for Entries</h4>
          )}
          {employees && employees.length > 0 ? (
            <PaginationComponent
              totalItems={total}
              pageSize={10}
              onSelect={setPage}
            />
          ) : null}
        </div>
        {alert}
      </div>
    </>
  );
}

export default Closeit;
