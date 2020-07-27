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
  const closeBar=()=>{
    setIsBarOpen(false)
    new Apimanager()
      .postroute("admin/line/closebar")
      .then((res) => {
        if (res.status == 200) {
          setIsBarOpen(false)
          setAlert(null)
        }else{
          setIsBarOpen(true)
        }
      })
      .catch((e) =>{
        setIsBarOpen(true);
         console.log(e)});
      setAlert(null)
  }
  const submitform = () => {
    setIsLineOpen(false)
    new Apimanager()
      .postroute("admin/line/destroyline")
      .then((res) => {
        if (res.status == 200) {
          setIsLineOpen(false)
          setIsBarOpen(true)
          setAlert(null)
        }else{
          setIsLineOpen(true)
        }
      })
      .catch((e) =>{
        setIsLineOpen(true);
         console.log(e)});
      setAlert(null)
  };
  useEffect(()=>{
    new Apimanager().postroute(`admin/line/checklineopen`).then(res=>{
      console.log(res.status)
      console.log(res.data)
      if(res.status==200)setIsLineOpen(res.data.success)
      else if(res.status == 201) setIsBarOpen(res.data.success)
      else {
        console.log('call')
        setIsLineOpen(false)
        setIsBarOpen(false)
      }
      new Apimanager().Getroute("Admin/line/customer").then((res) => {
        if(!res.success) return
       setCustomers(res.line)
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
    }).catch(e=>console.log(e))
   
    return ()=>{
        $(".data-table-wrapper").find("table").DataTable().destroy(true);
    }
  },[])
    var dataTable = {
      headerRow: ["Customer Id", "Full Name", "Email", "age", "Number in line", "Estimate time", "Status"],
      dataRows: customers.map((item,i) => [
        item.customer?item.customer.customerId :'',
        item.customer?item.customer.fullName:'',
        item.customer?item.customer.email:'',
        item.customer?calculateAge(item.customer.dateOfBirth):'',
        i+1,
        item.estimatedTime*i+1,
        item.customer?item.customer.joinedLine?'Available':'Currently Unavailable':'',
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
                <th style={{ fontWeight: "bold", color: "#000000" }}>
                  {dataTable.headerRow[6]}
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
          {console.log(isBarOpen+' '+isLineOpen)}
          <Row>
                    {isLineOpen? <Col md={12}>
                         <Button
                            onClick={()=>setAlert(<SweetAlert
                              warning
                              style={{ display: "block", marginTop: "100px" }}
                              title='Do you want to close line!'
                              onConfirm={submitform}
                              onCancel={() => setAlert(null)}
                              confirmBtnBsStyle="warning"
                              showCancel ={true}
                            ></SweetAlert>)}//submitform}
                            bsStyle="warning"
                            style={{
                              marginLeft: "45%",
                              height: 40,
                              width: 120,
                            }}
                          >
                            Close Line
                          </Button>
                      </Col>:
                      isBarOpen ?<Col md={12}>
                      <Button
                         onClick={()=>setAlert(<SweetAlert
                           warning
                           style={{ display: "block", marginTop: "100px" }}
                           title='Do you want to close Bar!'
                           onConfirm={closeBar}
                           onCancel={() => setAlert(null)}
                           confirmBtnBsStyle="warning"
                           showCancel ={true}
                         ></SweetAlert>)}//submitform}
                         bsStyle="warning"
                         style={{
                           marginLeft: "45%",
                           height: 40,
                           width: 120,
                         }}
                       >
                         Close Bar
                       </Button>
                   </Col>:null
                      }
                    </Row>
        </div>
        {alert}
      </div>
    );
}

export default Closeit;
