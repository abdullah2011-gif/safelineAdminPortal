import React, { useState, useEffect } from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";

import { Card } from "../../components/Card/Card";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import config from "../../config";

function UserProfile() {
     const [title,setTitle] = useState('')
     const [body,setBody] = useState('')
     const [alert,setAlert] = useState(null)

 const submitform = () => {
  var warning = "";
  if (title == '') {
    warning = "Please Enter title!";
  }else if (body == '') {
    warning = "Please Enter Body of notification!";
  }  else {
    warning = "";
  }
  if (warning) {
    setAlert(<SweetAlert
      warning
      style={{ display: "block", marginTop: "100px" }}
      title={warning}
      onConfirm={() => setAlert(null)}
      onCancel={() => setAlert(null)}
      confirmBtnBsStyle="warning"
      showCancel ={true}
    ></SweetAlert>)
    return;
  }
  new Apimanager().postroute(`admin/notification/custom`,{title,body}).then(res=>{
    if(res)  setAlert(<SweetAlert
      warning
      style={{ display: "block", marginTop: "100px" }}
      title={'notification seccessfully sent'}
      onConfirm={() => setAlert(null)}
      onCancel={() => setAlert(null)}
      confirmBtnBsStyle="warning"
      showCancel ={false}
    ></SweetAlert>)
  }).catch(e=>console.log(e))
  };

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Open Line"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6","col-md-6"]}
                      properties={[
                        {
                          label: "Title",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Title",
                          defaultValue: title,
                          onChange: (evt) => { setTitle(evt.target.value) },
                        },
                        {
                          label: "Body",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Body",
                          defaultValue: body,
                          onChange: (evt) => { setBody(evt.target.value) },
                        },
                      ]}
                    />
                    <Row>
                  <Col md={12}>
                         <Button
                            onClick={submitform}
                            //   setAlert(<SweetAlert
                            //   warning
                            //   style={{ display: "block", marginTop: "100px" }}
                            //   title='!'
                            //   onConfirm={submitform}
                            //   onCancel={() => setAlert(null)}
                            //   confirmBtnBsStyle="warning"
                            //   showCancel ={true}
                            // ></SweetAlert>)}//submitform}
                            bsStyle="warning"
                            style={{
                              marginLeft: "45%",
                              height: 40,
                              width: 120,
                            }}
                          >
                            Sent
                          </Button>
                      </Col>
                    </Row>
                        {alert}
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
}

export default UserProfile;
