import React, { useState,useEffect,useRef } from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";

import { Card } from "../../components/Card/Card";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import config from "../../config";
import { Alert } from "reactstrap";

function UserProfile(props) {
   const [employeeId,setEmployeeId] = useState('')
   const [fullName,setFullName] = useState('')
   const [email,setEmail] = useState('')
   const [dateOfBirth,setDateOfBirth] = useState('')
   const [picturePathway,setPicturePathway] = useState('')
   const [alert,setAlert] = useState(null)
   const [imgSrc,setImgSrc] = useState('')
   const [password,setPassword] = useState('')
   const [selectedFile,setSelectedFile] = useState(null)
   const file = useRef(null);

 const getInitialState = () => {
    return { file: [] };
  };

 const _onChange = (event) => {
    var f = event.target.files[0];
    var f = file.current.files[0];
    var reader = new FileReader();
    var url = f && reader.readAsDataURL(f);

    reader.onloadend = function (e) {
      setImgSrc(f ? [reader.result] : "")
      setSelectedFile(f)
    }
  };
 const updateform = (val) => {
    var warning = "";
    if (fullName == "") {
      warning = "Please Enter Name";
    } else if (email.emp_email == "") {
      warning = "Please Enter Email";
    }  else {
      warning = "";
    }
    if (warning) {
      setAlert((
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "100px" }}
            title={warning}
            onConfirm={() => setAlert(null)}
            onCancel={() => setAlert(null)}
            confirmBtnBsStyle="warning"
          ></SweetAlert>
        ),
      );
      return;
    }
    var Formdata = new FormData();
    Formdata.append("image", selectedFile);
    if ( selectedFile) {
      new Apimanager()
        .postrouteFormdata(
          `employee/image/${employeeId}`,
          Formdata
        )
        .then((res) => {
          if (res.status === 200) {
            new Apimanager()
              .PutrouteByid(`employee/detail/${employeeId}`,{fullName,email,dateOfBirth})
              .then((res) => {
                if (res.status == 200) {
                    setAlert((
                      <SweetAlert
                        success
                        style={{ display: "block", marginTop: "100px" }}
                        title="Data Updated!"
                        onConfirm={() => setAlert(null)}
                        onCancel={() => setAlert(null)}
                        confirmBtnBsStyle="info"
                      ></SweetAlert>
                    ),
                  );
                }
              })
              .catch((e) => console.log(e));
          }
        })
        .catch((e) => console.log(e));
    } else {
      new Apimanager()
        .PutrouteByid(`employee/detail/${employeeId}`,{fullName,email,dateOfBirth})
        .then((res) => {
          if (res.status == 200) {
            setAlert((
                <SweetAlert
                  success
                  style={{ display: "block", marginTop: "100px" }}
                  title="Data Updated!"
                  onConfirm={() => setAlert(null)}
                  onCancel={() => setAlert(null)}
                  confirmBtnBsStyle="info"
                ></SweetAlert>
              ),
            );
          }
        })
        .catch((e) => console.log(e));
    }
  };
const  submitform = () => {
  var id= -1
  var warning = "";
  if (fullName == "") {
    warning = "Please Enter Name";
  } else if (email == "") {
    warning = "Please Enter Email";
  }  else if (password == "") {
    warning = "Please Enter Email";
  } else {
    warning = "";
  }
    if (warning) {
      setAlert((
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "100px" }}
            title={warning}
            onConfirm={() => setAlert(null)}
            onCancel={() => setAlert(null)}
            confirmBtnBsStyle="warning"
          ></SweetAlert>
        ),
      );
      return;
    }
    if (! selectedFile ||  selectedFile == null) {
      setAlert((
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "100px" }}
            title="Please Select An Image !"
            onConfirm={() => setAlert(null)}
            onCancel={() => setAlert(null)}
            confirmBtnBsStyle="warning"
          ></SweetAlert>
        ),
      );
      return;
    }
    var Formdata = new FormData();
    Formdata.append("image",  selectedFile);

    new Apimanager()
      .postroute("signup",{fullName,email,dateOfBirth,password,type:'employee'})

      .then((res) => {
        if (res.status == 200) {
          console.log(res.data.user)
          Alert('')
          id=res.data.user.employeeId
         setFullName(res.data.user.fullName)
         setEmail(res.data.user.email)
         setDateOfBirth(res.data.user.dateOfBirth)
         setEmployeeId(res.data.user.employeeId)
         setPicturePathway(res.data.user.picturePathway)
        } else {
          setAlert((
              <SweetAlert
                danger
                style={{ display: "block", marginTop: "100px" }}
                title="Can't Create Category"
                onConfirm={() => setAlert(null)}
                onCancel={() => setAlert(null)}
                confirmBtnBsStyle="danger"
              ></SweetAlert>
            ),
          );
          return;
        }
      })
      .then(() => {
        if(id!=-1){
        new Apimanager()
          .postrouteFormdata(
            `employee/image/${id}`,
            Formdata
          )
          .then((res) => {
            if (res.status == 200) {
         setPicturePathway(res.data.picturePathway)
              setAlert((
                  <SweetAlert
                    success
                    style={{ display: "block", marginTop: "100px" }}
                    title="Account Created!"
                    onConfirm={() => setAlert(null)}
                    onCancel={() => setAlert(null)}
                    confirmBtnBsStyle="info"
                  ></SweetAlert>
                ),
              );
            } else {
              setAlert((
                  <SweetAlert
                    warning
                    style={{ display: "block", marginTop: "100px" }}
                    title="Account Created But Error In Image Uploading !"
                    onConfirm={() =>   setAlert( null )}
                    onCancel={() =>   setAlert( null )}
                    confirmBtnBsStyle="warning"
                  ></SweetAlert>
                ),
              );
            }
          })
          .catch((e) => console.log(e));}
      })
      .catch((e) => console.log(e));
  };
  useEffect(()=>{
    if (props.location.data) {
      const { data } =   props.location;
      setFullName(data.fullName)
      setEmail(data.email)
      setDateOfBirth(data.dateOfBirth)
      setEmployeeId(data.employeeId)
      setPicturePathway(data.picturePathway)
    }
  },[])
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add Account"
                content={
                  <form>
                    <Row>
                      <Col md={5}></Col>
                      <Col xs={6} md={4}>
                        <Image
                          src={
                             imgSrc
                              ?  imgSrc
                              :   picturePathway
                              ? `${config.url}public/images/${  picturePathway}`
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQJRm0mJ7HgVnAA17Be6O4-xfUa6LAtkR9k3lAI0tDgLwHQ0Ysi&usqp=CAU"
                          }
                          roundedCircle
                          style={{
                            width: 200,
                            height: 200,
                            borderWidth: 2,
                            borderRadius: 200,
                          }}
                        />
                      </Col>
                    </Row>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Employee Id",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Employee Id",
                          defaultValue:
                            props.match.params.data == ":data"
                              ? ""
                              : employeeId,
                          disabled:
                            props.match.params.data == ":data"
                            
                              ? false
                              : true,
                          onChange: (evt) => {setEmployeeId(evt.target.value)},
                        },
                        {
                          label: "Employee full name",
                          type: "text",
                          defaultValue:
                            props.match.params.data == ":data"
                              ? ""
                              : fullName,
                          bsClass: "form-control",
                          placeholder: "Employee Name",
                          onChange: (evt) => {setFullName(evt.target.value) },
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Email",
                          type: "text",
                          placeholder: "Email",
                          defaultValue:
                            props.match.params.data == ":data"
                              ? ""
                              : email,
                          onChange: (evt) => {setEmail(evt.target.value)},
                        },
                        {
                          label: "Date of birth",
                          type: "text",
                          defaultValue:
                            props.match.params.data == ":data"
                              ? ""
                              : dateOfBirth,
                          bsClass: "form-control",
                          placeholder: "Date of birth",
                          onChange: (evt) => {setDateOfBirth(evt.target.value)},
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Password",
                          type: "text",
                          placeholder: "Password",
                          disabled:
                          ! employeeId
                            ? false
                            : true,
                          defaultValue:password,
                          onChange: (evt) => {setPassword(evt.target.value)},
                        },
                      ]}
                    />
                    <Row>
                      <input
            ref={file}
                        type="file"
                        name="user[image]"
                        multiple="true"
                        onChange={  _onChange}
                      />
                      <Col md={12}>
                        {! employeeId ? (
                          <Button
                            onClick={() =>   submitform()}
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
                            onClick={() =>   updateform()}
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
                        { alert}
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

export default UserProfile;
