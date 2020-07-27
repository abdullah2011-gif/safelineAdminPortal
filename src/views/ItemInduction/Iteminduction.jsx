import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Image,
  DropdownButton,
  MenuItem,
  Modal,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import config from "../../config";
import QrCode from "react.qrcode.generator";
import Rating from "react-rating";

class UserProfile extends Component {
  state = {
    _id: "",
    item_id: "",
    item_name: "",
    item_brand: "",
    item_colour: "",
    item_condition: "",
    item_comments: "",
    item_cat: "",
    item_status: "",
    avalibility: "",
    storage_type: "",
    alert: null,
    selectedFile: null,
    img: "",
    selectedFile1: null,
    selectedFile2: null,
    selectedFile3: null,
    selectedFile4: null,
    imgSrc: ["", "", "", ""],
    item_pics: [],
    categories: [],
    cat_id: "",
    cus_det: {},
    closet_details: "",
    comments: {
      des_1: "",
      des_2: "",
      des_3: "",
      des_4: "",
    },
    save: false,
  };
  getInitialState = () => {
    return { file: [] };
  };

  componentDidMount = () => {
    new Apimanager().Getroute(`Admin/item_categories`).then((res) => {
      // console.log(res+"res")
      if (res) {
        this.setState({
          categories: res.map((item) => {
            return { name: item.cat_name, _id: item._id };
          }),
        });
      }
    });
    if (this.props.location.data) {
      // console.log(JSON.stringify(this.props.location.data)+'id')
      const { data } = this.props.location;
      this.setState({
        closet_details: data.closet_details,
        cus_det: data.cus_det,
      });
    }
  };
  _onChange = () => {
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = file && reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      this.setState({
        img: [reader.result],
        selectedFile: file,
      });
    }.bind(this);
  };
  _onChange0 = (event) => {
    var f = event.target.files[0];
    var file = this.refs.file0.files[0];
    var reader = new FileReader();
    var url = file && reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState((prevState) => {
        return {
          imgSrc: prevState.imgSrc.map((item, key) => {
            if (key == 0) return [reader.result];
            return item;
          }),
          selectedFile1: f,
        };
      });
    }.bind(this);
  };
  _onChange1 = (event) => {
    var f = event.target.files[0];
    var file = this.refs.file1.files[0];
    var reader = new FileReader();
    var url = file && reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState((prevState) => {
        return {
          imgSrc: prevState.imgSrc.map((item, key) => {
            if (key == 1) return [reader.result];
            return item;
          }),
          selectedFile2: f,
        };
      });
    }.bind(this);
  };
  _onChange2 = (event) => {
    var f = event.target.files[0];
    var file = this.refs.file2.files[0];
    var reader = new FileReader();
    var url = file && reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      this.setState((prevState) => {
        return {
          imgSrc: prevState.imgSrc.map((item, key) => {
            if (key == 2) return [reader.result];
            return item;
          }),
          selectedFile3: f,
        };
      });
    }.bind(this);
  };
  _onChange3 = (event) => {
    var f = event.target.files[0];
    var file = this.refs.file3.files[0];
    var reader = new FileReader();
    var url = file && reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      this.setState((prevState) => {
        return {
          imgSrc: prevState.imgSrc.map((item, key) => {
            if (key == 3) return [reader.result];
            return item;
          }),
          selectedFile4: f,
        };
      });
    }.bind(this);
  };
  updateform = (val) => {
    var warning = "";
    if (this.state.item_name == "") {
      warning = "Please Enter Name";
    } else if (this.state.item_brand == "") {
      warning = "Please Enter Item Brand";
    } else if (this.state.item_comments == "") {
      warning = "Please Enter Comments";
    } else if (this.state.item_condition == "") {
      warning = "Please Rate Condition";
    } else if (this.state.item_cat == "") {
      warning = "Please select Category";
    } else if (this.state.item_colour == "") {
      warning = "Please Select Item Colour";
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
    if (this.state.selectedFile) {
      new Apimanager()
        .postrouteFormdata(
          `Admin/item_categories/upload/categories/${this.state.cat_name}/${this.state.cat_id}`,
          Formdata
        )
        .then((res) => {
          if (res.status === 200) {
            new Apimanager()
              .PutrouteByid(
                `Admin/item_categories/${this.state.cat_id}`,
                this.state
              )
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
    if (this.state.item_name == "") {
      warning = "Please Enter Name";
    } else if (this.state.item_brand == "") {
      warning = "Please Enter Item Brand";
    } else if (this.state.item_comments == "") {
      warning = "Please Enter Comments";
    } else if (this.state.item_condition == "") {
      warning = "Please Rate Condition";
    } else if (this.state.item_cat == "") {
      warning = "Please select Category";
    } else if (this.state.item_colour == "") {
      warning = "Please Select Item Colour";
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
    var id = -1;
    // if (
    //   this.state.selectedFile1 == null &&
    //   !this.state.selectedFile1 &&
    //   this.state.selectedFile2 == null &&
    //   !this.state.selectedFile2 &&
    //   this.state.selectedFile3 == null &&
    //   !this.state.selectedFile3 &&
    //   this.state.selectedFile4 == null &&
    //   !this.state.selectedFile4
    // )
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
    if (this.state.selectedFile1) {
      Formdata.append("image", this.state.selectedFile1);
      Formdata.append("des_1", this.state.comments.des_1);
    }
    if (this.state.selectedFile1) {
      Formdata.append("image", this.state.selectedFile2);
      Formdata.append("des_2", this.state.comments.des_2);
    }
    if (this.state.selectedFile1) {
      Formdata.append("image", this.state.selectedFile3);
      Formdata.append("des_3", this.state.comments.des_3);
    }
    if (this.state.selectedFile1) {
      Formdata.append("image", this.state.selectedFile4);
      Formdata.append("des_4", this.state.comments.des_4);
    }

    new Apimanager()
      .postroute("Warehouse_manager/item_induction", {
        item_name: this.state.item_name,
        item_brand: this.state.item_brand,
        item_colour: this.state.item_colour,
        item_condition: this.state.item_condition,
        item_comments: this.state.item_comments,
        item_cat: this.state.cat_id,
        cat_type: this.state.item_cat,
        storage_type: this.state.storage_type,
        closet_det: this.state.closet_details,
        cus_det: this.state.cus_det._id,
      })

      .then((res) => {
        if (res.status == 200) {
          // console.log(res.data, "cat");
          this.setState({
            ...res.data,
            item_cat: this.state.item_cat,
            save: true,
          });
          // console.log(JSON.stringify(res.data) + "id");
        } else {
          this.setState({
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
          return;
        }
      })
      .then(() => {
        new Apimanager()
          .postrouteFormdata(
            `Warehouse_manager/item_induction/upload/${this.state.item_id}`,
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
  render() {
    var datacolour = [
      { name: "Apricot" },
      { name: "Baby blue" },
      { name: "Beige" },
      { name: "Black" },
      { name: "Blue" },
      { name: "Blue-green" },
      { name: "Blue-violet" },
      { name: "Bronze" },
      { name: "Brown" },
      { name: "Chocolate" },
      { name: "Cobalt blue" },
      { name: "Cyan" },
      { name: "Desert sand" },
      { name: "Gold" },
      { name: "Gray" },
      { name: "Green" },
      { name: "Jade" },
      { name: "Jungle green" },
      { name: "Maroon" },
      { name: "Navy blue" },
      { name: "Olive" },
      { name: "Orange" },
      { name: "Orange-red" },
      { name: "Peach" },
      { name: "Pear" },
      { name: "Pink" },
      { name: "Purple" },
      { name: "Red" },
      { name: "Silver" },
      { name: "Violet" },
      { name: "White" },
      { name: "Yellow" },
    ];
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            {/* {console.log(
              JSON.stringify(this.state.selectedFile1) +
                this.state.selectedFile2
            )} */}
            <Col md={12}>
              <Card
                content={
                  <form>
                    <Row>
                      <Col md={5}></Col>
                      <Col xs={6} md={4}>
                        <Image
                          src={
                            this.state.img
                              ? this.state.img
                              : `${config.url}public/images/${this.state.picture_pathway}`
                          }
                          roundedCircle
                          style={{
                            width: 200,
                            height: 150,
                            borderWidth: 2,
                            marginBottom: 25,
                          }}
                        />

                        <input
                          ref="file"
                          type="file"
                          name="user[image]"
                          multiple="true"
                          onChange={this._onChange}
                        />
                      </Col>
                    </Row>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Item Id",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Item Id",
                          defaultValue: this.state.item_id,
                          disabled: true,
                          onChange: (evt) => {
                            this.setState({ item_id: evt.target.value });
                          },
                        },
                        {
                          label: "Item Name",
                          type: "text",
                          defaultValue: this.state.item_name,
                          bsClass: "form-control",
                          placeholder: "Item Name",
                          onChange: (evt) => {
                            this.setState({ item_name: evt.target.value });
                          },
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Item Brand",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Item Brand",
                          defaultValue: this.state.item_brand,
                          onChange: (evt) => {
                            this.setState({ item_brand: evt.target.value });
                          },
                        },

                        {
                          label: "Item Comments",
                          componentClass: "textarea",
                          defaultValue: this.state.item_comments,
                          bsClass: "form-control",
                          placeholder: "Item Comments",
                          onChange: (evt) => {
                            this.setState({ item_comments: evt.target.value });
                          },
                        },
                        // {
                        //   label: "Item Colour",
                        //   type: "text",
                        //   defaultValue: this.state.cat_name,
                        //   bsClass: "form-control",
                        //   placeholder: "Item Colour",
                        //   onChange: (evt) => {
                        //     this.setState({ cat_name: evt.target.value });
                        //   },
                        // },
                      ]}
                    />
                    <Row>
                      <Col xs={6}>
                        <label>Item Condition</label>
                        <div>
                          <Rating
                            initialRating={this.state.item_condition}
                            onClick={(val) =>
                              this.setState({ item_condition: val })
                            }
                          />
                        </div>
                      </Col>
                      <Col xs={6}>
                        <label>Item Category</label>
                        <div>
                          {/* {console.log(JSON.stringify(this.state.selectedFile))} */}
                          <DropdownButton
                            value={this.state.item_cat}
                            bsStyle="default"
                            bsSize="large"
                            title={this.state.item_cat || "Select A Category"}
                          >
                            <MenuItem
                              style={{
                                overflowY: "scroll",
                                maxHeight:
                                  window.innerHeight -
                                  (this.myRef
                                    ? this.myRef.getBoundingClientRect().top +
                                      this.myRef.getBoundingClientRect()
                                        .height +
                                      100
                                    : 200),
                              }}
                            >
                              {this.state.categories.map((item) => {
                                return (
                                  <MenuItem
                                    onSelect={(val) =>
                                      this.setState({
                                        item_cat: item.name,
                                        cat_id: item._id,
                                      })
                                    }
                                    href="#books"
                                  >
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                            </MenuItem>
                          </DropdownButton>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={6}>
                        <label>Item Colour</label>
                        <div>
                          {/* {console.log(JSON.stringify(this.state.selectedFile))} */}
                          <DropdownButton
                            value={this.state.cat_name}
                            bsStyle="default"
                            bsSize="large"
                            height={32}
                            // style={{height:30}}
                            title={this.state.item_colour || "Select A Colour"}
                          >
                            <MenuItem
                              style={{
                                overflowY: "scroll",
                                maxHeight:
                                  window.innerHeight -
                                  (this.myRef
                                    ? this.myRef.getBoundingClientRect().top +
                                      this.myRef.getBoundingClientRect()
                                        .height +
                                      100
                                    : 200),
                              }}
                            >
                              {datacolour.map((item) => {
                                return (
                                  <MenuItem
                                    onSelect={(val) =>
                                      this.setState({
                                        item_colour: item.name,
                                      })
                                    }
                                    href="#books"
                                  >
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                            </MenuItem>
                          </DropdownButton>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={2} />
                      <Col md={3}>
                        <Image
                          src={
                            this.state.imgSrc[0]
                              ? this.state.imgSrc[0]
                              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA8FBMVEX////3tRn//v/8//////3//f////z9//v3sgD6///0rgD8//30sAD8//z//f3///r2thj1swD3rQD+++z6tBf2zGn3tB7xswD7sxj77Mf4rAD5tRX7//jxrwD4zHD0thz65bb525r436j404n1yGD0wUj9+u7315DywTjutQD999/0xlT9/+785br23aL826T10Hf57MT35q7vviv19Mzvylj0ui3u03D87NH3++D3033x5KP3xFD61Zb6wEL589T4x2L3yXT5ujjwxkT869bx24v72Jz63Kv01n316bf7/ufu45330on4v1DwxVH4yWaf2NYdAAAaEklEQVR4nO1dC3vaxtLem6TVSkKrZS0JCSIMNhh8KTgtdVwfk8vJaZO2yf//N9+MhO9x2sY5x9gf75NgLkLsaGbntrMjQjbYYIMNNthggw022GCDDTbYYIMNNthggw022GCDDTbYYIMNHgEijolgLGZCiMcey38FNVk+/IlI/CwpdF14OBgdEMIJ8x57NP8FCML7PyVFz2Svj4nPHns43xeRcFyXd6owt4mUdGKyOWee84wkFZSLINuFLpXeGr6YFKU2YxLwZ0Sh6wrSN2nxsgOKhpMfz2XZ2yZx9Njj+o7oOgdJan4ixHMi5NxMlqb92IP6nvAcPpblAlRo8zryz7X5Gfj5bOA4fkXN3Ll43fI7imbEfcwxfV+4JFY2iy95FjCSadN+RhaDk1FYJvxSswhOKqlGjzmk74yAdVUajkCjNv4oF/7JzhF/RjwEuhY2OQIDGNV89FwRcBLEjz2u7wdg3MCU2YhEpNY2jsda4IE/Ix66AYt0li9ekbimKmKBEMFz0qWIaUhzNZyC9W89I95dA+NLKW1msp8D0KTPE073hZJVWWzxZ6RhriOAyH50GlKdEeevj35q4AFnERFuwH9WVPrCZcT1BHlG85E5jsfBKAbkRFWFzzj44E7kPqP4cJV38trTX4xWPy7bMYc4kbceeVjfE757sr1VGVWEmtIiUao62+64z0CntpgIIsK9w/3QJNZSRJrCQ251orKzwQgY6YknbPmjGLTJdBaqrJpom1NrwwQgtQZCrS2l2poTv/WEpdVz/M6uSdI0zUsT9pLdndPxv8ans3OtZJKkOtVJ8fLD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"
                          }
                          style={{
                            width: 150,
                            height: 100,
                            borderWidth: 2,
                          }}
                        />
                        <input
                          style={{ marginTop: 7 }}
                          ref="file0"
                          type="file"
                          name="user[image]"
                          multiple="true"
                          onChange={this._onChange0}
                        />
                        <FormInputs
                          ncols={["col-md-12"]}
                          properties={[
                            {
                              label: "Item Condition",
                              bsClass: "form-control",
                              componentClass: "textarea",
                              placeholder: "Item Condition",
                              defaultValue: this.state.comments.des_1,
                              onChange: (evt) => {
                                this.setState({
                                  comments: {
                                    ...this.state.comments,
                                    des_1: evt.target.value,
                                  },
                                });
                              },
                            },
                          ]}
                        />
                      </Col>
                      <Col md={2} />

                      {this.state.imgSrc[0] && (
                        <Col md={3}>
                          <Image
                            src={
                              this.state.imgSrc[1]
                                ? this.state.imgSrc[1]
                                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA8FBMVEX////3tRn//v/8//////3//f////z9//v3sgD6///0rgD8//30sAD8//z//f3///r2thj1swD3rQD+++z6tBf2zGn3tB7xswD7sxj77Mf4rAD5tRX7//jxrwD4zHD0thz65bb525r436j404n1yGD0wUj9+u7315DywTjutQD999/0xlT9/+785br23aL826T10Hf57MT35q7vviv19Mzvylj0ui3u03D87NH3++D3033x5KP3xFD61Zb6wEL589T4x2L3yXT5ujjwxkT869bx24v72Jz63Kv01n316bf7/ufu45330on4v1DwxVH4yWaf2NYdAAAaEklEQVR4nO1dC3vaxtLem6TVSkKrZS0JCSIMNhh8KTgtdVwfk8vJaZO2yf//N9+MhO9x2sY5x9gf75NgLkLsaGbntrMjQjbYYIMNNthggw022GCDDTbYYIMNNthggw022GCDDTbYYIMNHgEijolgLGZCiMcey38FNVk+/IlI/CwpdF14OBgdEMIJ8x57NP8FCML7PyVFz2Svj4nPHns43xeRcFyXd6owt4mUdGKyOWee84wkFZSLINuFLpXeGr6YFKU2YxLwZ0Sh6wrSN2nxsgOKhpMfz2XZ2yZx9Njj+o7oOgdJan4ixHMi5NxMlqb92IP6nvAcPpblAlRo8zryz7X5Gfj5bOA4fkXN3Ll43fI7imbEfcwxfV+4JFY2iy95FjCSadN+RhaDk1FYJvxSswhOKqlGjzmk74yAdVUajkCjNv4oF/7JzhF/RjwEuhY2OQIDGNV89FwRcBLEjz2u7wdg3MCU2YhEpNY2jsda4IE/Ix66AYt0li9ekbimKmKBEMFz0qWIaUhzNZyC9W89I95dA+NLKW1msp8D0KTPE073hZJVWWzxZ6RhriOAyH50GlKdEeevj35q4AFnERFuwH9WVPrCZcT1BHlG85E5jsfBKAbkRFWFzzj44E7kPqP4cJV38trTX4xWPy7bMYc4kbceeVjfE757sr1VGVWEmtIiUao62+64z0CntpgIIsK9w/3QJNZSRJrCQ251orKzwQgY6YknbPmjGLTJdBaqrJpom1NrwwQgtQZCrS2l2poTv/WEpdVz/M6uSdI0zUsT9pLdndPxv8ans3OtZJKkOtVJ8fLD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"
                            }
                            style={{
                              width: 150,
                              height: 100,
                              borderWidth: 2,
                            }}
                          />
                          <input
                            style={{ marginTop: 7 }}
                            ref="file1"
                            type="file"
                            name="user[image]"
                            multiple="true"
                            onChange={this._onChange1}
                          />{" "}
                          <FormInputs
                            ncols={["col-md-12"]}
                            properties={[
                              {
                                label: this.state.imgSrc[0]
                                  ? "Item Condition"
                                  : "",
                                bsClass: "form-control",
                                disabled: this.state.imgSrc[0] ? false : true,
                                componentClass: "textarea",
                                placeholder: this.state.imgSrc[0]
                                  ? "Item Condition"
                                  : "",
                                defaultValue: this.state.comments.des_2,
                                onChange: (evt) => {
                                  this.setState({
                                    comments: {
                                      ...this.state.comments,
                                      des_2: evt.target.value,
                                    },
                                  });
                                },
                              },
                            ]}
                          />
                        </Col>
                      )}
                    </Row>

                    <Row>
                      <Col md={2} />
                      {this.state.imgSrc[1] && (
                        <Col md={3}>
                          <Image
                            src={
                              this.state.imgSrc[2]
                                ? this.state.imgSrc[2]
                                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA8FBMVEX////3tRn//v/8//////3//f////z9//v3sgD6///0rgD8//30sAD8//z//f3///r2thj1swD3rQD+++z6tBf2zGn3tB7xswD7sxj77Mf4rAD5tRX7//jxrwD4zHD0thz65bb525r436j404n1yGD0wUj9+u7315DywTjutQD999/0xlT9/+785br23aL826T10Hf57MT35q7vviv19Mzvylj0ui3u03D87NH3++D3033x5KP3xFD61Zb6wEL589T4x2L3yXT5ujjwxkT869bx24v72Jz63Kv01n316bf7/ufu45330on4v1DwxVH4yWaf2NYdAAAaEklEQVR4nO1dC3vaxtLem6TVSkKrZS0JCSIMNhh8KTgtdVwfk8vJaZO2yf//N9+MhO9x2sY5x9gf75NgLkLsaGbntrMjQjbYYIMNNthggw022GCDDTbYYIMNNthggw022GCDDTbYYIMNHgEijolgLGZCiMcey38FNVk+/IlI/CwpdF14OBgdEMIJ8x57NP8FCML7PyVFz2Svj4nPHns43xeRcFyXd6owt4mUdGKyOWee84wkFZSLINuFLpXeGr6YFKU2YxLwZ0Sh6wrSN2nxsgOKhpMfz2XZ2yZx9Njj+o7oOgdJan4ixHMi5NxMlqb92IP6nvAcPpblAlRo8zryz7X5Gfj5bOA4fkXN3Ll43fI7imbEfcwxfV+4JFY2iy95FjCSadN+RhaDk1FYJvxSswhOKqlGjzmk74yAdVUajkCjNv4oF/7JzhF/RjwEuhY2OQIDGNV89FwRcBLEjz2u7wdg3MCU2YhEpNY2jsda4IE/Ix66AYt0li9ekbimKmKBEMFz0qWIaUhzNZyC9W89I95dA+NLKW1msp8D0KTPE073hZJVWWzxZ6RhriOAyH50GlKdEeevj35q4AFnERFuwH9WVPrCZcT1BHlG85E5jsfBKAbkRFWFzzj44E7kPqP4cJV38trTX4xWPy7bMYc4kbceeVjfE757sr1VGVWEmtIiUao62+64z0CntpgIIsK9w/3QJNZSRJrCQ251orKzwQgY6YknbPmjGLTJdBaqrJpom1NrwwQgtQZCrS2l2poTv/WEpdVz/M6uSdI0zUsT9pLdndPxv8ans3OtZJKkOtVJ8fLD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"
                            }
                            style={{
                              width: 150,
                              height: 100,
                              borderWidth: 2,
                            }}
                          />{" "}
                          <input
                            style={{ marginTop: 7 }}
                            ref="file2"
                            type="file"
                            name="user[image]"
                            multiple="true"
                            onChange={this._onChange2}
                          />{" "}
                          <FormInputs
                            ncols={["col-md-12"]}
                            properties={[
                              {
                                label: this.state.imgSrc[1]
                                  ? "Item Condition"
                                  : "",
                                bsClass: "form-control",
                                componentClass: "textarea",
                                disabled: this.state.imgSrc[1] ? false : true,
                                placeholder: this.state.imgSrc[1]
                                  ? "Item Condition"
                                  : "",
                                placeholder: "Item Condition",
                                defaultValue: this.state.comments.des_3,
                                onChange: (evt) => {
                                  this.setState({
                                    comments: {
                                      ...this.state.comments,
                                      des_3: evt.target.value,
                                    },
                                  });
                                },
                              },
                            ]}
                          />
                        </Col>
                      )}

                      <Col md={2} />

                      {this.state.imgSrc[2] && (
                        <Col md={3}>
                          <Image
                            src={
                              this.state.imgSrc[3]
                                ? this.state.imgSrc[3]
                                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA8FBMVEX////3tRn//v/8//////3//f////z9//v3sgD6///0rgD8//30sAD8//z//f3///r2thj1swD3rQD+++z6tBf2zGn3tB7xswD7sxj77Mf4rAD5tRX7//jxrwD4zHD0thz65bb525r436j404n1yGD0wUj9+u7315DywTjutQD999/0xlT9/+785br23aL826T10Hf57MT35q7vviv19Mzvylj0ui3u03D87NH3++D3033x5KP3xFD61Zb6wEL589T4x2L3yXT5ujjwxkT869bx24v72Jz63Kv01n316bf7/ufu45330on4v1DwxVH4yWaf2NYdAAAaEklEQVR4nO1dC3vaxtLem6TVSkKrZS0JCSIMNhh8KTgtdVwfk8vJaZO2yf//N9+MhO9x2sY5x9gf75NgLkLsaGbntrMjQjbYYIMNNthggw022GCDDTbYYIMNNthggw022GCDDTbYYIMNHgEijolgLGZCiMcey38FNVk+/IlI/CwpdF14OBgdEMIJ8x57NP8FCML7PyVFz2Svj4nPHns43xeRcFyXd6owt4mUdGKyOWee84wkFZSLINuFLpXeGr6YFKU2YxLwZ0Sh6wrSN2nxsgOKhpMfz2XZ2yZx9Njj+o7oOgdJan4ixHMi5NxMlqb92IP6nvAcPpblAlRo8zryz7X5Gfj5bOA4fkXN3Ll43fI7imbEfcwxfV+4JFY2iy95FjCSadN+RhaDk1FYJvxSswhOKqlGjzmk74yAdVUajkCjNv4oF/7JzhF/RjwEuhY2OQIDGNV89FwRcBLEjz2u7wdg3MCU2YhEpNY2jsda4IE/Ix66AYt0li9ekbimKmKBEMFz0qWIaUhzNZyC9W89I95dA+NLKW1msp8D0KTPE073hZJVWWzxZ6RhriOAyH50GlKdEeevj35q4AFnERFuwH9WVPrCZcT1BHlG85E5jsfBKAbkRFWFzzj44E7kPqP4cJV38trTX4xWPy7bMYc4kbceeVjfE757sr1VGVWEmtIiUao62+64z0CntpgIIsK9w/3QJNZSRJrCQ251orKzwQgY6YknbPmjGLTJdBaqrJpom1NrwwQgtQZCrS2l2poTv/WEpdVz/M6uSdI0zUsT9pLdndPxv8ans3OtZJKkOtVJ8fLD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"
                            }
                            roundedCircle
                            style={{
                              width: 150,
                              height: 100,
                              borderWidth: 2,
                            }}
                          />{" "}
                          <input
                            style={{ marginTop: 7 }}
                            ref="file3"
                            type="file"
                            name="user[image]"
                            multiple="true"
                            onChange={this._onChange3}
                          />{" "}
                          <FormInputs
                            ncols={["col-md-12"]}
                            properties={[
                              {
                                label: this.state.imgSrc[2]
                                  ? "Item Condition"
                                  : "",
                                bsClass: "form-control",
                                componentClass: "textarea",
                                disabled: this.state.imgSrc[2] ? false : true,
                                placeholder: this.state.imgSrc[2]
                                  ? "Item Condition"
                                  : "",
                                placeholder: "Item Condition",
                                defaultValue: this.state.comments.des_4,
                                onChange: (evt) => {
                                  this.setState({
                                    comments: {
                                      ...this.state.comments,
                                      des_4: evt.target.value,
                                    },
                                  });
                                },
                              },
                            ]}
                          />
                        </Col>
                      )}
                    </Row>
                    <Row>
                      <Col md={12}>
                        {
                          !this.state.item_id ? (
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
                          ) : null
                          // (
                          //   <Button
                          //     onClick={() => this.submitform()}
                          //     bsStyle="warning"
                          //     style={{
                          //       marginLeft: "45%",
                          //       height: 40,
                          //       width: 120,
                          //     }}
                          //   >
                          //     Update
                          //   </Button>
                          // )
                        }
                      </Col>
                    </Row>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
        <Modal
          style={{
            width: "20%",
            height: "60%",
            borderRadius: 40,
            marginLeft: "40%",
          }}
          size="sm"
          show={this.state.save}
        >
          <Modal.Header
            onHide={() => this.setState({ save: false })}
            closeButton
          ></Modal.Header>
          <Row>
            <Col md={12}>
              <Card
                // title="Add Items"
                content={
                  <div>
                    <div style={{ alignSelf: "center", marginLeft: "15%" }}>
                      {/* <QrCode value={this.state._id} /> */}
                    </div>

                    <h3>{this.state._id}</h3>
                  </div>
                }
              />
            </Col>
          </Row>
          <div style={{ height: 60, width: "38%", marginLeft: "20%" }}>
            <span style={{ marginRight: "5%" }}>
              <Button
                variant="secondary"
                onClick={() => this.setState({ save: false })}
              >
                Close
              </Button>
            </span>
          </div>
        </Modal>
        {this.state.alert}
      </div>
    );
  }
}

export default UserProfile;
