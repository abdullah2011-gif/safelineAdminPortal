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
  Image,
  Form
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
  username:'',
  old_pass:'',
  new_pass:''
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
  new Apimanager().postrouteFormdata(`Admin/item_categories/upload/categories/${this.state.cat_name}/${this.state.cat_id}`,Formdata).then((res)=>{
    if(res.status===200){
    new Apimanager().PutrouteByid(`Admin/item_categories/${this.state.cat_id}`,this.state).then(res=>{
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
  new Apimanager().PutrouteByid(`Admin/item_categories/${this.state.cat_id}`,this.state).then(res=>{
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
    
     new Apimanager().postroute('Admin/item_categories',{cat_name:this.state.cat_name})
   
     .then(res=>{
      if(res.status==200){
        console.log(res.data,"cat")
        this.setState({
          ...res.data.category
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
      new Apimanager().postrouteFormdata(`Admin/item_categories/upload/categories/${this.state.cat_name}/${this.state.cat_id}`,Formdata).then((res)=>{
        if(res.status==200){
          this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{display: "block",marginTop: "100px"}}
                    title="Category Created!"
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
                    title="Category Created But Error In Image Uploading !"
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
  //  console.log(JSON.stringify(this.props.location.data)+"thats data i need")
   if(this.props.location.data){
   const  {data } = this.props.location
   // var dataa = data.split(",");
  //  console.log(data.mem_name,"here i am");
   this.setState({
     ...data
   });}
 };
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add Categories"
                content={
                  <form>
                     {/* <Row >
                      <Col  md={5}></Col>
                      <Col xs={6} md={4}>
                        <Image
                          src={this.state.imgSrc?this.state.imgSrc:`${config.url}public/images/${this.state.picture_pathway}`}
                          roundedCircle
                          style={{width:200,height:150,
                          borderWidth: 2,}}
                        />
                      </Col>
                    </Row> */}
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          defaultValue:this.props.match.params.data==':data'?'': this.state.username,
                          disabled:this.props.match.params.data==':data'?false:true,
                          onChange: (evt)=>{
                            this.setState({username:evt.target.value})
                          },
                        },
                        {
                          label: "Old Password",
                          type: "text",
                          defaultValue:this.props.match.params.data==':data'?'':this.state.old_pass,
                          bsClass: "form-control",
                          placeholder: "Old Password",
                          onChange: (evt)=>{
                            this.setState({old_pass:evt.target.value})
                          },
                        },
                         {
                            label: "New Password",
                            type: "text",
                            defaultValue:this.props.match.params.data==':data'?'':this.state.new_pass,
                            bsClass: "form-control",
                            placeholder: "New Password",
                            onChange: (evt)=>{
                              this.setState({new_pass:evt.target.value})
                            },
                          }
                      ]}
                    />
                       <Row>
                       {/* <input 
                          ref="file" 
                          type="file" 
                          name="user[image]" 
                          multiple="true"
                          onChange={this._onChange}/> */}
                      <Col  md={12}>
                     <Button onClick={()=> this.submitform()} bsStyle="warning"style={{marginLeft:"45%",height:40,width:120}}>Save</Button>
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
