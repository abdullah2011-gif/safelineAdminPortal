import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "../../components/Card/Card";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../components/CustomButton/CustomButton";
import SweetAlert from "react-bootstrap-sweetalert";
import Apimanager from "../../NodeFunctions/Functions";

class UserProfile extends Component {
  state = {
    customerId: "",
    _id: "",
    fullName: "",
    email: "",
    phone: "",
    picturePathway: "",
    greek: "",
    alert: null,
  };
  updateform = (val) => {
    new Apimanager()
      .PutrouteByid("customer/detail/" + this.state._id, { ...this.state })
      .then((res) => {
        this.setState({
          alert: (
            <SweetAlert
              success
              style={{ display: "block", marginTop: "100px" }}
              title={`Successfully Updated record!`}
              onConfirm={() => this.setState({ alert: null })}
              onCancel={() => this.setState({ alert: null })}
              confirmBtnBsStyle="Warning"
            ></SweetAlert>
          ),
        });
      });
  };
  componentDidMount = () => {
    //  console.log(JSON.stringify(this.props.location.data)+"thats data i need")
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
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add Closeit"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Full Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Full Name",
                          defaultValue: this.state.fullName,
                          onChange: (evt) => {
                            this.setState({ fullName: evt.target.value });
                          },
                        },
                        {
                          label: "Email",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Email",
                          defaultValue: this.state.email,
                          disabled: true,
                          onChange: (evt) => {
                            this.setState({ email: evt.target.value });
                          },
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Phone",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Phone",
                          defaultValue: this.state.phone,
                          onChange: (evt) => {
                            this.setState({ phone: evt.target.value });
                          },
                        },
                        {
                          label: "Greek Organization",
                          type: "text",
                          defaultValue: this.state.greek,
                          bsClass: "form-control",
                          placeholder: "Greek Organization",
                          onChange: (evt) => {
                            this.setState({ greek: evt.target.value });
                          },
                        },
                      ]}
                    />
                    <Row>
                      <Col md={12}>
                        <div>
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
                        </div>
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
