import React,{useState,useEffect,useRef} from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import $ from "jquery";

require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");

function Closeit(props) {
  const [alert,setAlert] = useState(null);
  const [ employees, setEmployees] = useState([])
  const [isdatableinitialize,setIsdatableinitialize]=useState(false)
  const main = useRef(null);
useEffect(()=>{
  new Apimanager().Getroute("employee/detail").then((res) => {
    res.shift();
    console.log(res)
    setEmployees(res)
    if (!isdatableinitialize) {
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
      setIsdatableinitialize(true)
    }
  }).catch(e=>console.log(e))
  return ()=>{
    $(".data-table-wrapper").find("table").DataTable().destroy(true);
  }
},[])
 const editrecord = (item, key) => {
    props.history.push({
      pathname: `/admin/addemployee`,
      data: employees[key], // your data array of objects
    });
  };
 const modalVisible = (id) => {
   setAlert(  <SweetAlert
    danger
    style={{ display: "block", marginTop: "100px" }}
    title={`Are you Sure You Want To Delete Record Of ID ${id} !`}
    onConfirm={() => deleterecord(id)}
    onCancel={() => setAlert(null)}
    confirmBtnBsStyle="Danger"
    showCancel
    confirmBtnText="Yes"
  ></SweetAlert>)
  };
 const deleterecord = (id) => {
    new Apimanager()
      .deleterouteByid(`employee/detail/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setAlert(<SweetAlert
            success
            style={{ display: "block", marginTop: "100px" }}
            title={`Successfully Delete Record Of ID ${id} !`}
            onConfirm={() => setAlert(null)}
            onCancel={() => deleterecord(id)}
            confirmBtnBsStyle="Warning"
          ></SweetAlert>)
        }
      })
      .then(() =>new Apimanager().Getroute("employee/detail").then((res) => {
        res.shift();
        setEmployees(res)
      }).catch(e=>console.log(e)));
  };
    var dataTable = {
      headerRow: [
        "Employee Id",
        "Employee Name",
        "Email",
      ],
      dataRows: employees.map((item) => [
        item.employeeId,
        item.fullName,
        item.email,
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
              </tr>
            </thead>
            <tbody>
              {dataTable.dataRows.map((prop, key) => {
                return (
                  <tr key={key}>
                    {prop.map((prop, key) => {
                      return <td key={key}>{prop}</td>;
                    })}
                    <td className="text-right">
                      <Button
                        style={{ marginRight: 8, width: 70 }}
                        onClick={() => editrecord(prop, key)}
                        bsStyle="warning"
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        style={{ width: 70 }}
                        onClick={() => modalVisible(prop[0])}
                        bsStyle="danger"
                      >
                        Delete
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
