import React, { Component } from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";

import { Card } from "../../components/Card/Card";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import config from "../../config";

class UserProfile extends Component {
  state = {
    cat_id: "",
    cat_name: "",
    picture_pathway: "",
    alert: null,
    selectedFile: null,
    imgSrc: "",
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
  updateform = (val) => {
    var warning = "";
    if (this.state.cat_name == "") {
      warning = "Please Enter Name";
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
          `Admin/item_categories/upload/categories/${this.state.cat_name}/${this.state.cat_id}`,
          Formdata
        )
        .then((res) => {
          if (res.status === 200) {
            new Apimanager()
              .PutrouteByid(`Admin/item_categories/${this.state.cat_id}`, {
                name: this.state.cat_name,
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
        })
        .catch((e) => console.log(e));
    } else {
      new Apimanager()
        .PutrouteByid(`Admin/item_categories/${this.state.cat_id}`, this.state)
        .then((res) => {
          // console.log(res)
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
    if (this.state.cat_name == "") {
      warning = "Please Enter Name";
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
      .postroute("Admin/item_categories", { cat_name: this.state.cat_name })

      .then((res) => {
        if (res.status == 200) {
          // console.log(res.data,"cat")
          this.setState({
            ...res.data.category,
          });
          // console.log(res.data+"id")
        } else {
          return this.setState({
            alert: (
              <SweetAlert
                danger
                style={{ display: "block", marginTop: "100px" }}
                title="Can't Create Category"
                onConfirm={() => this.setState({ alert: null })}
                onCancel={() => this.setState({ alert: null })}
                confirmBtnBsStyle="danger"
              ></SweetAlert>
            ),
          });
        }
      })
      .then(() => {
        new Apimanager()
          .postrouteFormdata(
            `Admin/item_categories/upload/categories/${this.state.cat_name}/${this.state.cat_id}`,
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
    if (this.props.location.data) {
      const { data } = this.props.location;
      this.setState({
        ...data,
      });
    }
  };
  render() {
    return (
      <div className="content">
        {/* {console.log(JSON.stringify(this.state.selectedFile))} */}
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add Categories"
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
                          label: "Category Id",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Category Id",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.cat_id,
                          disabled:
                            this.props.match.params.data == ":data"
                              ? false
                              : true,
                          onChange: (evt) => {
                            this.setState({ cat_id: evt.target.value });
                          },
                        },
                        {
                          label: "Category Name",
                          type: "text",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.cat_name,
                          bsClass: "form-control",
                          placeholder: "Category Name",
                          onChange: (evt) => {
                            this.setState({ cat_name: evt.target.value });
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
                        {!this.state.cat_id ? (
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
                      </Col>
                    </Row>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
        {this.state.alert}
      </div>
    );
  }
}

export default UserProfile;
