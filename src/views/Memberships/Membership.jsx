import React from "react";
import ImageUploader from "react-images-upload";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
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
      mem_detail: [],
      alert: null,
      isdatableinitialize: false,
    };
  }

  componentDidMount() {
    new Apimanager()
      .Getroute("Admin/memberships")
      .then((res) => {
        // console.log(res.detail,"detail")
        res.shift();
        this.setState((prevState) => {
          return {
            ...prevState,
            mem_detail: res,
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
      pathname: `/admin/admembership`,
      data: this.state.mem_detail[key], // your data array of objects
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
    // console.log(this.state.mem_detail, "sd");[]
    var dataTable = {
      headerRow: [
        "Membership Id",
        "Membership Name",
        "Membership Fee",
        "No Of Pieces",
      ],
      // footerRow: ["Membership Id", "Membership Name", "Membership Fee","No Of Pieces"],
      dataRows: this.state.mem_detail.map((item) => [
        item.mem_id,
        item.mem_name,
        item.mem_fee,
        item.no_of_pieces,
      ]),
    };
    return (
      <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
        <div
          className="fresh-datatables"
          style={{
            width: "90%",
            marginLeft: "5%",
            padding: 15,
            backgroundColor: "#F9F9F9",
          }}
        >
          <table
            id="datatables"
            ref="main"
            className="table table-striped table-no-bordered table-hover"
            cellSpacing="0"
            width="100%"
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
                <th
                  style={{ fontWeight: "bold", color: "#000000" }}
                  className="disabled-sorting text-right"
                >
                  {dataTable.headerRow[4]}
                </th>
              </tr>
            </thead>
            {/* <tfoot>
            <tr>
              <th>{dataTable.footerRow[0]}</th>
              <th>{dataTable.footerRow[1]}</th>
              <th>{dataTable.footerRow[2]}</th>
              <th>{dataTable.footerRow[3]}</th>
              <th className="text-right">
                {dataTable.footerRow[4]}
              </th>
            </tr>
          </tfoot> */}
            <tbody>
              {dataTable.dataRows.map((prop, key) => {
                return (
                  <tr key={key}>
                    {prop.map((prop, key) => {
                      return <td key={key}>{prop}</td>;
                    })}
                    <td style={{ width: "20%" }} className="text-right">
                      <Button
                        style={{ marginRight: 8, width: 70 }}
                        onClick={() => this.editrecord(prop, key)}
                        bsStyle="warning"
                      >
                        Edit
                      </Button>
                      <Button
                        style={{ width: 70 }}
                        onClick={() => this.modalVisible(prop[0])}
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

        {this.state.alert}
      </div>
    );
  }
}

export default Closeit;
