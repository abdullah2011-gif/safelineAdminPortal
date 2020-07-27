/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import SweetAlert from "react-bootstrap-sweetalert";
import config from "../../config";
import Apimanager from "../../NodeFunctions/Functions";

class UserProfile extends Component {
  state = {
    mem_id: "",
    mem_name: "",
    mem_fee: "",
    no_of_pieces: "",
    cleaning: false,
    storage: false,
    insurance: false,
    location: false,
    alterations: false,
    handling: false,
    picture_pathway: "",
    alert: null,
    selectedFile: null,
    imgSrc: "",
    description: "",
  };
  updateform = () => {
    var warning = "";
    if (this.state.mem_name == "") {
      warning = "Please Enter Name";
    } else if (this.state.mem_fee == "") {
      warning = "Please Enter Fee";
    } else if (
      !(
        this.state.no_of_pieces.match("^[0-9]*$") &&
        this.state.no_of_pieces != ""
      )
    ) {
      warning = "Please Enter Valid No Of Pieces";
    } else if (this.state.description == "") {
      warning = "Please Enter Discription";
    } else {
      warning = "";
    }
    if (warning) {
      this.setState({
        alert: (
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "100px" }}
            title={warning}
            onConfirm={() => this.setState({ alert: null })}
            onCancel={() => this.setState({ alert: null })}
            confirmBtnBsStyle="warning"
          ></SweetAlert>
        ),
      });
      return;
    }
    var Formdata = new FormData();
    Formdata.append("image", this.state.selectedFile);
    if (this.state.selectedFile) {
      new Apimanager()
        .postrouteFormdata(
          `Admin/membership/upload/memberships/${this.state.mem_id}`,
          Formdata
        )
        .then((res) => {
          if (res.status === 200) {
            new Apimanager()
              .PutrouteByid(`Admin/memberships/${this.state.mem_id}`, {
                ...this.state,
                selectedFile: null,
                imgSrc: "",
                description: this.state.description,
              })
              .then((res) => {
                if (res.status == 200) {
                  this.setState({
                    alert: (
                      <SweetAlert
                        success
                        style={{ display: "block", marginTop: "100px" }}
                        title="Data Updated!"
                        onConfirm={() => this.setState({ alert: null })}
                        onCancel={() => this.setState({ alert: null })}
                        confirmBtnBsStyle="info"
                      ></SweetAlert>
                    ),
                  });
                }
              });
          }
        })
        .catch((e) => console.log(e));
    } else {
      new Apimanager()
        .PutrouteByid(`Admin/memberships/${this.state.mem_id}`, {
          ...this.state,
          selectedFile: null,
          imgSrc: "",
          description: this.state.description,
        })
        .then((res) => {
          if (res.status == 200) {
            this.setState({
              alert: (
                <SweetAlert
                  success
                  style={{ display: "block", marginTop: "100px" }}
                  title="Data Updated!"
                  onConfirm={() => this.setState({ alert: null })}
                  onCancel={() => this.setState({ alert: null })}
                  confirmBtnBsStyle="info"
                ></SweetAlert>
              ),
            });
          }
        })
        .catch((e) => console.log(e));
    }
  };
  submitform = () => {
    var warning = "";
    if (this.state.mem_name == "") {
      warning = "Please Enter Name";
    } else if (this.state.mem_fee == "") {
      warning = "Please Enter Fee";
    } else if (
      !(
        this.state.no_of_pieces.match("^[0-9]*$") &&
        this.state.no_of_pieces != ""
      )
    ) {
      warning = "Please Enter Valid No Of Pieces";
    } else if (this.state.description == "") {
      warning = "Please Enter Discription";
    } else {
      warning = "";
    }
    if (warning) {
      this.setState({
        alert: (
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "100px" }}
            title={warning}
            onConfirm={() => this.setState({ alert: null })}
            onCancel={() => this.setState({ alert: null })}
            confirmBtnBsStyle="warning"
          ></SweetAlert>
        ),
      });
      return;
    }
    if (!this.state.selectedFile || this.state.selectedFile == null) {
      this.setState({
        alert: (
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "100px" }}
            title="Please Select An Image !"
            onConfirm={() => this.setState({ alert: null })}
            onCancel={() => this.setState({ alert: null })}
            confirmBtnBsStyle="warning"
          ></SweetAlert>
        ),
      });
      return;
    }
    var Formdata = new FormData();
    Formdata.append("image", this.state.selectedFile);

    new Apimanager()
      .postroute("Admin/memberships", {
        ...this.state,
        selectedFile: null,
        imgSrc: "",
        description: this.state.description,
      })
      .then((res) => {
        if (res.status == 200) {
          this.setState({
            ...res.data,
            alert: (
              <SweetAlert
                success
                style={{ display: "block", marginTop: "100px" }}
                title="Membership Created!"
                onConfirm={() => this.setState({ alert: null })}
                onCancel={() => this.setState({ alert: null })}
                confirmBtnBsStyle="info"
              ></SweetAlert>
            ),
          });
        }
      })
      .then(() => {
        new Apimanager()
          .postrouteFormdata(
            `Admin/membership/upload/memberships/${this.state.mem_id}`,
            Formdata
          )
          .then((res) => {
            if (res.status == 200) {
              this.setState({
                alert: (
                  <SweetAlert
                    success
                    style={{ display: "block", marginTop: "100px" }}
                    title="Category Created!"
                    onConfirm={() => this.setState({ alert: null })}
                    onCancel={() => this.setState({ alert: null })}
                    confirmBtnBsStyle="info"
                  ></SweetAlert>
                ),
              });
            } else {
              this.setState({
                alert: (
                  <SweetAlert
                    warning
                    style={{ display: "block", marginTop: "100px" }}
                    title="Category Created But Error In Image Uploading !"
                    onConfirm={() => this.setState({ alert: null })}
                    onCancel={() => this.setState({ alert: null })}
                    confirmBtnBsStyle="warning"
                  ></SweetAlert>
                ),
              });
            }
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };
  componentDidMount = () => {
    // console.log(JSON.stringify(this.props.location.data) + "thats data i need");
    if (this.props.location.data) {
      const { data } = this.props.location;
      // var dataa = data.split(",");
      // console.log(data.mem_name, "here i am");
      this.setState({
        ...data,
      });
    }
  };
  getInitialState = () => {
    return { file: [] };
  };

  _onChange = () => {
    // Assuming only image
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = file && reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        imgSrc: [reader.result],
        selectedFile: file,
      });
    }.bind(this);
  };
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add Membership"
                content={
                  <form>
                    <Row>
                      <Col md={5}></Col>
                      <Col xs={6} md={4}>
                        <Image
                          src={
                            this.state.imgSrc
                              ? this.state.imgSrc
                              : this.state.picture_pathway
                              ? `${config.url}public/images/${this.state.picture_pathway}`
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQJRm0mJ7HgVnAA17Be6O4-xfUa6LAtkR9k3lAI0tDgLwHQ0Ysi&usqp=CAU"
                          }
                          roundedCircle
                          style={{ width: 200, height: 150, borderWidth: 2 }}
                        />
                      </Col>
                    </Row>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Membership Id",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Membership Id",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.mem_id,
                          disabled:
                            this.props.match.params.data == ":data"
                              ? false
                              : true,
                          onChange: (evt) => {
                            this.setState({ mem_id: evt.target.value });
                          },
                        },
                        {
                          label: "Membership Name",
                          type: "text",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.mem_name,
                          bsClass: "form-control",
                          placeholder: "Membership Name",
                          onChange: (evt) => {
                            this.setState({ mem_name: evt.target.value });
                          },
                        },
                      ]}
                    />
                    {/* {console.log(this.state)} */}
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Membership Fee",
                          type: "text",
                          placeholder: "Membership Fee",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.mem_fee,
                          onChange: (evt) => {
                            this.setState({ mem_fee: evt.target.value });
                          },
                        },
                        {
                          label: "Number Of Pieces",
                          type: "text",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.no_of_pieces,
                          bsClass: "form-control",
                          placeholder: "Number Of Pieces",
                          onChange: (evt) => {
                            this.setState({ no_of_pieces: evt.target.value });
                          },
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Description",
                          bsClass: "form-control",
                          componentClass: "textarea",
                          placeholder: "Description",
                          value: this.state.description,
                          onChange: (evt) => {
                            this.setState({
                              description: evt.target.value,
                            });
                          },
                        },
                      ]}
                    />
                    <Row>
                      <Col md={1} />
                      <Col md={4}>
                        {/* <div> */}
                        <label style={{ width: "30%", fontWeight: "bold" }}>
                          Cleaning
                        </label>
                        <BootstrapSwitchButton
                          onstyle="warning"
                          offstyle="outline-info"
                          style={{ backgroundColor: "black" }}
                          width={70}
                          height={35}
                          checked={this.state.cleaning}
                          onlabel="YES"
                          offlabel="NO"
                          onChange={(checked) => {
                            this.setState({ cleaning: checked });
                          }}
                        />{" "}
                      </Col>{" "}
                      <Col md={1} />{" "}
                      <Col md={4}>
                        <label style={{ width: "30%", fontWeight: "bold" }}>
                          Storage
                        </label>
                        <BootstrapSwitchButton
                          onstyle="warning"
                          offstyle="outline-info"
                          style={{ backgroundColor: "black" }}
                          width={70}
                          height={35}
                          checked={this.state.storage}
                          onlabel="YES"
                          offlabel="NO"
                          onChange={(checked) => {
                            this.setState({ storage: checked });
                          }}
                        />{" "}
                      </Col>
                    </Row>{" "}
                    <Row>
                      <Col md={1} />{" "}
                      <Col md={4}>
                        <label style={{ width: "30%", fontWeight: "bold" }}>
                          Insurance
                        </label>
                        <BootstrapSwitchButton
                          onstyle="warning"
                          offstyle="outline-info"
                          style={{ backgroundColor: "black" }}
                          width={70}
                          height={35}
                          checked={this.state.insurance}
                          onlabel="YES"
                          offlabel="NO"
                          onChange={(checked) => {
                            this.setState({ insurance: checked });
                          }}
                        />{" "}
                      </Col>{" "}
                      <Col md={1} />{" "}
                      <Col md={4}>
                        {/* </div> */}

                        {/* <div style={{marginTop:'2%',marginBottom:'2%'}}> */}
                        <label style={{ width: "30%", fontWeight: "bold" }}>
                          Alteration
                        </label>
                        <BootstrapSwitchButton
                          onstyle="warning"
                          offstyle="outline-info"
                          style={{ backgroundColor: "black" }}
                          width={70}
                          height={35}
                          checked={this.state.alterations}
                          onlabel="YES"
                          offlabel="NO"
                          onChange={(checked) => {
                            this.setState({ alterations: checked });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      {" "}
                      <Col md={1} />{" "}
                      <Col md={4}>
                        <label style={{ width: "30%", fontWeight: "bold" }}>
                          Handling
                        </label>
                        <BootstrapSwitchButton
                          onstyle="warning"
                          offstyle="outline-info"
                          style={{ backgroundColor: "black" }}
                          width={70}
                          height={35}
                          checked={this.state.handling}
                          onlabel="YES"
                          offlabel="NO"
                          onChange={(checked) => {
                            this.setState({ handling: checked });
                          }}
                        />
                        {/* </div> */}
                      </Col>
                    </Row>
                    <Row>
                      <input
                        style={{ marginTop: 15 }}
                        ref="file"
                        type="file"
                        name="user[image]"
                        multiple="true"
                        onChange={this._onChange}
                      />
                      <Col md={12}>
                        <div>
                          {!this.state.mem_id ? (
                            <Button
                              onClick={() => this.submitform()}
                              bsStyle="warning"
                              style={{
                                marginLeft: "45%",
                                height: 40,
                                width: 120,
                              }}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              onClick={() => this.updateform()}
                              bsStyle="warning"
                              style={{
                                marginLeft: "45%",
                                height: 40,
                                width: 120,
                              }}
                            >
                              Update
                            </Button>
                          )}
                        </div>
                        {this.state.alert}
                      </Col>
                    </Row>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
