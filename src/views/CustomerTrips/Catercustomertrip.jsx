import React from "react";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import $ from "jquery";
require("datatables.net-responsive");
$.DataTable = require("datatables.net-bs");

class Closeit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      alert: null,
    };
  }
  componentDidMount() {
    new Apimanager()
      .Getroute("customers/place_order")
      .then((res) => {
        // res.shift()
        this.setState((prevState) => {
          return {
            ...prevState,
            details: res,
          };
        });
        if (!this.state.isdatableinitialize) {
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
          this.setState({ isdatableinitialize: true });
        }
      })
      .catch((e) => console.log(e));
  }

  componentWillUnmount() {
    $(".data-table-wrapper").find("table").DataTable().destroy(true);
  }
  editrecord = (item, key) => {
    this.props.history.push({
      pathname: `trip/itemdetails`,
      data: {
        items: this.state.details[key].items,
        order_id: this.state.details[key].order_id,
      },
    });
  };
  modalVisible = (id) => {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "100px" }}
          title={`Are you Sure You Want To Delete Record Of ID ${id} !`}
          onConfirm={() => this.deleterecord(id)}
          onCancel={() => this.setState({ alert: null })}
          confirmBtnBsStyle="Danger"
          showCancel
          confirmBtnText="Yes"
        ></SweetAlert>
      ),
    });
  };
  deleterecord = (id) => {
    new Apimanager()
      .deleterouteByid(`Admin/memberships/${id}`)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            alert: (
              <SweetAlert
                success
                style={{ display: "block", marginTop: "100px" }}
                title={`Successfully Delete Record Of ID ${id} !`}
                onConfirm={() => this.setState({ alert: null })}
                onCancel={() => this.deleterecord(id)}
                confirmBtnBsStyle="Warning"
              ></SweetAlert>
            ),
          });
        }
      })
      .then(() => this.componentDidMount())
      .catch((e) => console.log(e));
  };
  render() {
    var dataTable = {
      headerRow: [
        "Customer Id",
        "Customer Name",
        "Contact",
        "Email",
        "Social Security number",
        "Order Id",
        "No of Items",
        "Closet Name",
        "Date Of Arival",
        "Date Of Departure",
      ],
      dataRows: this.state.details.map((item) => [
        item.cus_details.cus_id,
        item.cus_details.F_name + " " + item.cus_details.L_name,
        item.cus_details.Contact_no_1,
        item.cus_details.E_mail,
        item.cus_details.social_security_number,
        item.order_id,
        item.items.length,
        item.where_to,
        item.date_arrival + " " + item.time_arrival,
        item.date_departure + " " + item.time_departure,
      ]),
    };
    return (
      <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
        <div
          className="fresh-datatables"
          style={{
            // width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            padding: 15,
            backgroundColor: "#f7f7f8",
          }}
        >
          <table
            id="datatables"
            ref="main"
            className="table table-striped table-no-bordered table-hover"
            cellSpacing="0%"
            align="center"
          >
            <thead>
              <tr>
                <th style={{ fontWeight: "bold", color: "#000000"}}>
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
                <th style={{ fontWeight: "bold", color: "#000000" }}>
                  {dataTable.headerRow[10]}
                </th>
                <th style={{ fontWeight: "bold", color: "#000000" }}>
                  {dataTable.headerRow[11]}
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
                        onClick={() => this.editrecord(prop, key)}
                        bsStyle="warning"
                      >
                        Select
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {this.state.alert}
      </div>
    );
  }
}

export default Closeit;
