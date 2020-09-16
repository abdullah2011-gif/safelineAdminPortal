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
  const [isLineOpen,setIsLineOpen] = useState(false)
  const [isBarOpen,setIsBarOpen] = useState(false)
  const main = useRef(null);
  const calculateAge =(age)=>{
    var a = moment();
  var c=  moment(age).format('DD/MM/YYYY').slice(6,10)
var b = moment(c, 'YYYY');  
var diff = a.diff(b, 'years'); // calculates patient's age in years
return diff; // this prints out the age
  }
 const editrecord=(prop)=>{
    new Apimanager().PutrouteByid("admin/bumpup/"+prop[0]).then((res) => {
      if(res.data)
      setAlert(<SweetAlert
        warning
        style={{ display: "block", marginTop: "100px" }}
        title={res.data.message}
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="warning"
        showCancel ={true}
      ></SweetAlert>)
          new Apimanager().Getroute("Admin/party/detail").then((res) => {
            setCustomers(res)
          })
    })
  }
  useEffect(()=>{
      new Apimanager().Getroute("Admin/party/detail").then((res) => {
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
  console.log(customers)
    var dataTable = {
      headerRow: ["Id", "no of customers","time"],
      dataRows: customers.map((item,i) => [
        item.partyId?item.partyId:'',
        item.customers&&item.customers.length>0?item.customers.length :'',
        item.createdAt?moment(item.createdAt).format('HH-mm'):'',
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
                    <td className="text-right">
                      <Button
                        style={{ marginRight: 8, width: 90 }}
                        onClick={() => editrecord(prop, key)}
                        bsStyle="warning"
                      >
                        Bump up
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {console.log(isBarOpen+' '+isLineOpen)}
          <Row>
                    </Row>
        </div>
        {alert}
      </div>
    );
}

export default Closeit;
