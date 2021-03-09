import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import { Table } from "react-bootstrap";

function Closeit(props) {
  const [alert, setAlert] = useState(null);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    new Apimanager().Getroute("v1/employee/detail").then((res) => {
      console.log(res);
      setEmployees(res);
    });
  };
  const editrecord = (item, key) => {
    props.history.push({
      pathname: `/admin/addemployee`,
      data: item, // your data array of objects
    });
  };
  const modalVisible = (id) => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "100px" }}
        title={`Are you Sure You Want To Delete Record Of ID ${id} !`}
        onConfirm={() => deleterecord(id)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="Danger"
        showCancel
        confirmBtnText="Yes"
      ></SweetAlert>
    );
  };
  const deleterecord = (_id) => {
    new Apimanager()
      .patchroute(`v1/employee/detail`, { _id })
      .then((res) => {
        if (res.status === 200) {
          setAlert(
            <SweetAlert
              success
              style={{ display: "block", marginTop: "100px" }}
              title={`Successfully Delete Record Of ID ${_id} !`}
              onConfirm={() => setAlert(null)}
              onCancel={() => setAlert(null)}
              confirmBtnBsStyle="Warning"
            ></SweetAlert>
          );
        }
      })
      .then(() => getData());
  };

  const GetTableData = () => {
    return employees.map((item, key) => {
      return (
        <tr>
          <td>{item.employeeId}</td>
          <td>{item.fullName}</td>
          <td>{item.email}</td>
          <td className="text-right">
            <Button
              style={{ marginRight: 8, width: 70 }}
              onClick={() => editrecord(item)}
              bsStyle="warning"
            >
              Edit
            </Button>
          </td>
          <td>
            <Button
              style={{ width: 70 }}
              onClick={() => modalVisible(item._id)}
              bsStyle="danger"
            >
              Delete
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
          width: "90%",
          backgroundColor: "#f9f9f9",
          marginLeft: "5%",
          padding: 15,
        }}
      >
        {employees && employees.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{GetTableData()}</tbody>
          </Table>
        ) : (
          <h4>No data for Employee</h4>
        )}
      </div>
      {alert}
    </div>
  );
}

export default Closeit;
