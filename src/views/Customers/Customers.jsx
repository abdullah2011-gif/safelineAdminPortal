import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import { Table, Dropdown, DropdownButton, MenuItem } from "react-bootstrap";

import moment from "moment";
import PaginationComponent from "react-reactstrap-pagination";

function Closeit(props) {
  const [alert, setAlert] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const calculateAge = (age) => {
    var b = moment(age, "DD/MM/YYYY").toDate();
    if (b == "Invalid Date") b = moment(age).toDate();
    var diff = moment().diff(b, "years");
    return diff;
  };
  const editrecord = (_id, vipStatus) => {
    new Apimanager()
      .PutrouteByid("v1/admin/customer", { _id, vipStatus })
      .then((res) => {
        getData();
        if (res.data)
          setAlert(
            <SweetAlert
              success
              style={{ display: "block", marginTop: "100px" }}
              title={"successfully update status"}
              onConfirm={() => setAlert(null)}
              onCancel={() => setAlert(null)}
              confirmBtnBsStyle="warning"
              showCancel={true}
            ></SweetAlert>
          );
        getData();
      });
  };
  const getData = () => {
    new Apimanager()
      .Getroute("v1/admin/customer", { skip: (page - 1) * 10, limit: 10 })
      .then((res) => {
        if (res) {
          console.log(res);
          setCustomers(res.customers);
          setTotal(res.count);
        }
      });
  };
  useEffect(() => {
    getData();
  }, [page]);
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
    setAlert(null);
    getData();
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

  const GetTableData = () => {
    return customers.map((item, key) => {
      return (
        <tr>
          <td>{item.fullName}</td>
          <td>{item.email}</td>
          <td>{calculateAge(item.dateOfBirth)}</td>
          <td>{item.phone}</td>
          <td>{item.greek ? item.greek : "not selected"}</td>
          <td>
            {/* <Button
              style={{ marginRight: 8, width: 90 }}
              onClick={() => editrecord(item._id)}
              bsStyle="warning"
            > */}
            <DropdownButton title={item.vipStatus ? item.vipStatus : "regular"}>
              <MenuItem
                onClick={(evt) => editrecord(item._id, "regular")}
                value="regular"
                href="#books"
              >
                regular
              </MenuItem>
              <MenuItem
                onClick={(evt) => editrecord(item._id, "vip")}
                value="vip"
                href="#podcasts"
              >
                vip
              </MenuItem>
              <MenuItem
                onClick={(evt) => editrecord(item._id, "Promoter")}
                value="Promoter"
                href="#"
              >
                Promoter
              </MenuItem>
            </DropdownButton>
            {/* </Button> */}
          </td>
          <td>
            <Button
              style={{ marginRight: 8, width: 90 }}
              onClick={() => edit(item, key)}
              bsStyle="warning"
            >
              {"Edit"}
            </Button>
          </td>
          <td>
            <Button
              style={{ marginRight: 8, width: 90 }}
              onClick={() => modalVisible(item._id)}
              bsStyle="warning"
            >
              {"Delete"}
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
        {customers && customers.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>age</th>
                <th>Phone</th>
                <th>Greek Organization</th>
                <th>set type</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{GetTableData()}</tbody>
          </Table>
        ) : (
          <h4>No data for Customers</h4>
        )}
        {customers && customers.length > 0 ? (
          <PaginationComponent
            totalItems={total}
            pageSize={10}
            onSelect={setPage}
          />
        ) : null}
      </div>
      {alert}
    </div>
  );
}

export default Closeit;
