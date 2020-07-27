import React,{useState,useEffect,useRef} from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import {Row,Col} from 'react-bootstrap'
import moment from 'moment'
import $ from "jquery";
require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");

function Closeit() {
  const [alert,setAlert] = useState(null)
  const [isDatableInitialize,setIsDatableInitialize] = useState(false)
  const [customers,setCustomers] = useState([])
  const main = useRef(null);
  const calculateAge =(age)=>{
    var a = moment()
var b = moment(age, 'DD/MM/YYYY');  
var diff = a.diff(b, 'years'); 
return diff; 
  }
  useEffect(()=>{
    new Apimanager().Getroute("customer").then((res) => {
      // res.shift();
     setCustomers(res)
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
        setIsDatableInitialize(true)
      }
    });
    return ()=>{
        $(".data-table-wrapper").find("table").DataTable().destroy(true);
    }
  },[])
    var dataTable = {
      headerRow: ["Customer Id", "Full Name", "Email", "age"],
      dataRows: customers.map((item,i) => [
        item.customerId,
        item.fullName,
        item.email,
        calculateAge(item.dateOfBirth),
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
