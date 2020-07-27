import React, { useState, useEffect } from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";

import { Card } from "../../components/Card/Card";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import config from "../../config";

function UserProfile() {
     const [capacity,setCapacity] = useState(20)
     const [alert,setAlert] = useState(null)
     const [isLineOpen,setIsLineOpen] = useState(true)

     useEffect(()=>{
      new Apimanager().Getroute(`admin/line/checklineopen`).then(res=>{
        if(res)setIsLineOpen(res.success)
      }).catch(e=>console.log(e))
     },[])
 const submitform = () => {
  setIsLineOpen(true)
    var warning = "";
    if (capacity == 0) {
      warning = "Please Enter Capacity";
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
    new Apimanager()
      .postroute("admin/line/makeline", {capacity:capacity,internalCapacity:capacity})
      .then((res) => {
        if (res.status == 200) {
          setIsLineOpen(true)
          setAlert(null)
        }else{
          setIsLineOpen(false)
        }
      })
      .catch((e) =>{
        setIsLineOpen(true); 
        console.log(e)});
      setAlert(null)
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
                    {console.log(isLineOpen)}
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Inside Capacity Of Bar",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Inside Capacity Of Bar",
                          defaultValue: capacity,
                          onChange: (evt) => { setCapacity(evt.target.value) },
                        },
                        // {
                        //   label: "Closet Name",
                        //   type: "text",
                        //   defaultValue:
                        //     this.props.match.params.data == ":data"
                        //       ? ""
                        //       : this.state.closet_name,
                        //   bsClass: "form-control",
                        //   placeholder: "Closet Name",
                        //   onChange: (evt) => {
                        //     this.setState({ closet_name: evt.target.value });
                        //   },
                        // },
                      ]}
                    />
                    <Row>
                    {!isLineOpen&& <Col md={12}>
                         <Button
                            onClick={()=>setAlert(<SweetAlert
                              warning
                              style={{ display: "block", marginTop: "100px" }}
                              title='Do you want to open line!'
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
                            Open Line
                          </Button>
                      </Col>}
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
