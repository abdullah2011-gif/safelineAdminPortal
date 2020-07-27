import React, { Component } from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import config from "../../config";

class UserProfile extends Component {
  state = {
    closet_id: "",
    closet_name: "",
    location: "",
    city: "",
    couboards: "",
    alert: null,
    picture_pathway: "",
    selectedFile: null,
    imgSrc: "",
  };
  updateform = (val) => {
    var warning = "";
    if (this.state.closet_name == "") {
      warning = "Please Enter Name";
    } else if (this.state.city == "") {
      warning = "Please Enter City";
    } else if (this.state.location == "") {
      warning = "Please Enter City";
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
          `Admin/closets/upload/closets/${this.state.closet_id}`,
          Formdata
        )
        .then((res) => {
          if (res.status === 200) {
            new Apimanager()
              .PutrouteByid(`Admin/closets/${this.state.closet_id}`, {
                ...this.state,
                selectedFile: {},
                imgSrc: "",
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
        .PutrouteByid(`Admin/closets/${this.state.closet_id}`, {
          ...this.state,
          selectedFile: {},
          imgSrc: "",
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
    if (this.state.closet_name == "") {
      warning = "Please Enter Name";
    } else if (this.state.city == "") {
      warning = "Please Enter City";
    } else if (this.state.location == "") {
      warning = "Please Enter City";
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
      .postroute("Admin/closets", {
        ...this.state,
        selectedFile: {},
        imgSrc: "",
      })
      .then((res) => {
        if (res.status == 200) {
          this.setState({
            ...res.data,
          });
        }
      })
      .then(() => {
        new Apimanager()
          .postrouteFormdata(
            `Admin/closets/upload/closets/${this.state.closet_id}`,
            Formdata
          )
          .then((res) => {
            if (res.status == 200) {
              this.setState({
                alert: (
                  <SweetAlert
                    success
                    style={{ display: "block", marginTop: "100px" }}
                    title="Closet Created!"
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
                    title="Closet Created But Error In Image Uploading !"
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
    if (this.props.location.data) {
      const { data } = this.props.location;
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
                title="Add Closet"
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
                              : "data:image/jpeg;base64,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"
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
                          label: "Closet Id",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Closet Id",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.closet_id,
                          disabled:
                            this.props.match.params.data == ":data"
                              ? false
                              : true,
                          onChange: (evt) => {
                            this.setState({ closet_id: evt.target.value });
                          },
                        },
                        {
                          label: "Closet Name",
                          type: "text",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.closet_name,
                          bsClass: "form-control",
                          placeholder: "Closet Name",
                          onChange: (evt) => {
                            this.setState({ closet_name: evt.target.value });
                          },
                        },
                      ]}
                    />
                    {/* {console.log(this.state)} */}
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Closet City",
                          type: "text",
                          placeholder: "Closet City",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.city,
                          onChange: (evt) => {
                            this.setState({ city: evt.target.value });
                          },
                        },
                        {
                          label: "Closet Location",
                          type: "text",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.location,
                          bsClass: "form-control",
                          placeholder: "Closet Location",
                          onChange: (evt) => {
                            this.setState({ location: evt.target.value });
                          },
                        },
                      ]}
                    />
                    <Row>
                      <input
                        ref="file"
                        type="file"
                        name="user[image]"
                        multiple="true"
                        onChange={this._onChange}
                      />
                      <Col md={12}>
                        {!this.state.closet_id ? (
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
