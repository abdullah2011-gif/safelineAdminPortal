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
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Image
} from "react-bootstrap";

import { Card } from "../../components/Card/Card";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../components/CustomButton/CustomButton";
import Apimanager from '../../NodeFunctions/Functions'
import SweetAlert from 'react-bootstrap-sweetalert';
import config from '../../config'
import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {
state={
  emp_id:'2',
  emp_name:'',
  emp_ssn:'',
  emp_email:'',
  emp_contact:'',
  picture_pathway:'',
  selectedFile: null,
  imgSrc:''
}
getInitialState=()=>{
  return{file: []}
}

_onChange=()=>{
  // Assuming only image
  var file = this.refs.file.files[0];
  var reader = new FileReader();
  var url = reader.readAsDataURL(file);

   reader.onloadend = function (e) {
      this.setState({
          imgSrc: [reader.result],
          selectedFile:file
      })
    }.bind(this);
 // console.log(file) // Would see a path?
  // TODO: concat files
}
updateform = (val) => {
  var Formdata = new FormData()
Formdata.append('image',this.state.selectedFile)
if (this.state.selectedFile){
  new Apimanager().postrouteFormdata(`Admin/employees/upload/employees/${this.state.emp_name}/${this.state.emp_id}`,Formdata).then((res)=>{
    if(res.status===200){
    new Apimanager().PutrouteByid(`Admin/employees/${this.state.emp_id}`,this.state).then(res=>{
      // console.log(res)
      if(res.status==200){
       this.setState({
         alert: (
             <SweetAlert
                 success
                 style={{display: "block",marginTop: "100px"}}
                 title="Data Updated!"
                 onConfirm={() => this.setState({alert: null})}
                 onCancel={() => this.setState({alert: null})}
                 confirmBtnBsStyle="info"
             >
             </SweetAlert> 
         )
     })
      }
    })}
  })
}
else{
  new Apimanager().PutrouteByid(`Admin/employees/${this.state.emp_id}`,{ emp_name:'',
  emp_ssn:this.state.emp_ssn,
  emp_email:this.state.emp_email,
  emp_contact:this.state.emp_contact})
  .then(res=>{
    // console.log(res)
    if(res.status==200){
     this.setState({
       alert: (
           <SweetAlert
               success
               style={{display: "block",marginTop: "100px"}}
               title="Data Updated!"
               onConfirm={() => this.setState({alert: null})}
               onCancel={() => this.setState({alert: null})}
               confirmBtnBsStyle="info"
           >
           </SweetAlert> 
       )
   })
    }
  })}
 };
 submitform=()=>{
   var id=-1;
   if (!this.state.selectedFile||this.state.selectedFile==null){
    this.setState({
      alert: (
          <SweetAlert
              warning
              style={{display: "block",marginTop: "100px"}}
              title="Please Select An Image !"
              onConfirm={() => this.setState({alert: null})}
              onCancel={() => this.setState({alert: null})}
              confirmBtnBsStyle="warning"
          >
          </SweetAlert> 
      )
  })
  return
   }
   var Formdata = new FormData()
   Formdata.append('image',this.state.selectedFile)
    
     new Apimanager().postroute('Admin/employees',{ emp_name:this.state.emp_name,
     emp_ssn:this.state.emp_ssn,
     emp_email:this.state.emp_email,
     emp_contact:this.state.emp_contact})
   
     .then(res=>{
      if(res.status==200){
        console.log(res.data,"cat")
        this.setState({
          ...res.data
        })
        console.log(res.data+"id")
        }else{
        this.setState({
          alert: (
              <SweetAlert
                  danger
                  style={{display: "block",marginTop: "100px"}}
                  title="Can't Create Category"
                  onConfirm={() => this.setState({alert: null})}
                  onCancel={() => this.setState({alert: null})}
                  confirmBtnBsStyle="danger"
              >
              </SweetAlert>
          )
      })
      return
       }
     }).then(()=>{
      new Apimanager().postrouteFormdata(`Admin/employees/upload/employees/${this.state.emp_name}/${this.state.emp_id}`,Formdata).then((res)=>{
        if(res.status==200){
          this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{display: "block",marginTop: "100px"}}
                    title="Account Created!"
                    onConfirm={() => this.setState({alert: null})}
                    onCancel={() => this.setState({alert: null})}
                    confirmBtnBsStyle="info"
                >
                </SweetAlert>
            )
        })
        }else{
          this.setState({
            alert: (
                <SweetAlert
                    warning
                    style={{display: "block",marginTop: "100px"}}
                    title="Account Created But Error In Image Uploading !"
                    onConfirm={() => this.setState({alert: null})}
                    onCancel={() => this.setState({alert: null})}
                    confirmBtnBsStyle="warning"
                >
                </SweetAlert>
            )
        })
        }
      }).catch(e=>{
        this.setState({
          alert: (
              <SweetAlert
                  danger
                  style={{display: "block",marginTop: "100px"}}
                  title="404 !"
                  onConfirm={() => this.setState({alert: null})}
                  onCancel={() => this.setState({alert: null})}
                  confirmBtnBsStyle="danger"
              >
              </SweetAlert>
          )
      })
       })
     }).catch(e=>{
      this.setState({
        alert: (
            <SweetAlert
                danger
                style={{display: "block",marginTop: "100px"}}
                title="404 !"
                onConfirm={() => this.setState({alert: null})}
                onCancel={() => this.setState({alert: null})}
                confirmBtnBsStyle="danger"
            >
            </SweetAlert>
        )
    })
     })
 }
 componentDidMount = () => {
 new Apimanager().getrouteByid(`Admin/employees/${this.state.emp_id}`).then((res)=>{
   this.setState({
     ...res.data,
   })
 })
 };
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                content={
                  <form>
                     <Row >
                      <Col  md={5}></Col>
                      <Col xs={6} md={4}>
                        {/* <Image
                          src={`${config.url}public/images/public\\images\\categories\\2\\shoes-2.jpeg`}
                          roundedCircle
                          style={{width:200,height:200,
                          borderWidth: 2,
                          borderRadius: 200,}}
                        /> */}
                           <Image
                          src={this.state.imgSrc?this.state.imgSrc:`${config.url}public/images/${this.state.picture_pathway}`}
                          roundedCircle
                          style={{width:200,height:200,
                            borderWidth: 2,
                            borderRadius: 200,}}
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
                          defaultValue:this.state.emp_id,
                          disabled:this.props.match.params.data==':data'?false:true,
                          onChange: (evt)=>{
                            this.setState({emp_id:evt.target.value})
                          },
                        },
                        {
                          label: "Employee Name",
                          type: "text",
                          defaultValue:this.state.emp_name,
                          bsClass: "form-control",
                          placeholder: "Employee Name",
                          onChange: (evt)=>{
                            this.setState({emp_name:evt.target.value})
                          },
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "emp_email",
                          type: "text",
                          placeholder: "emp_email",
                          disabled:true,
                          defaultValue: this.state.emp_email,
                          onChange: (evt)=>{
                            this.setState({emp_email:evt.target.value})
                          },
                        },
                        {
                          label: "Social Security Number",
                          type: "text",
                          disabled:true,
                          defaultValue:this.state.emp_ssn,
                          bsClass: "form-control",
                          placeholder: "Social Security Number",
                          onChange: (evt)=>{
                            this.setState({emp_ssn:evt.target.value})
                          },
                        }
                      ]}
                    />
                     <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "emp_contact",
                          type: "text",
                          placeholder: "emp_contact",
                          defaultValue:this.state.emp_contact,
                          onChange: (evt)=>{
                            this.setState({emp_contact:evt.target.value})
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
                          onChange={this._onChange}/>
                      <Col md={12}>
                     <Button onClick={()=> this.updateform()} bsStyle="warning"style={{marginLeft:"45%",height:40,width:120}}>Update</Button>
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
