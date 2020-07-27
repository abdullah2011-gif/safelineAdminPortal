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
  Image ,
  DropdownButton,
  MenuItem,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Apimanager from '../../NodeFunctions/Functions'
import SweetAlert from 'react-bootstrap-sweetalert';
import config from '../../config'

class UserProfile extends Component {
state={
  alert:null,
  checkout_id:'',
  checkout_reason:'',
  focal_contact:'',
  item:{},
  imgSrc: ["","","",""],
  comments:{
    des_1:'',
    des_2:'',
    des_3:'',
    des_4:'',
  },
  item_pics: [],
  selectedFile1: null,
  selectedFile2: null,
  selectedFile3: null,
  selectedFile4: null,
}

 componentDidMount = () => {
   if(this.props.location.data){
   const  {data } = this.props.location
   this.setState({
    item:   data.item_det
   });}
 };

 getInitialState = () => {
  return { file: [] };
};
_onChange0 = (event) => {
  // console.log(event.target.files[0])
  var f = event.target.files[0];
  // console.log(f)
  var file = this.refs.file0.files[0];
  var reader = new FileReader();
  // console.log(f+(this.refs.file0.files[0])+'onchange')
  var url = reader.readAsDataURL(file);

  reader.onloadend = function (e) {
    // console.log([reader.result]+'img')
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
  // Assuming only image
  var f = event.target.files[0];
  // console.log(f)
  var file = this.refs.file1.files[0];
  var reader = new FileReader();
  var url = reader.readAsDataURL(file);
  // console.log(JSON.stringify(file)+JSON.stringify(reader)+'onchange')

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
  // console.log(f)
  // Assuming only image
  var file = this.refs.file2.files[0];
  var reader = new FileReader();
  var url = reader.readAsDataURL(file);
  // console.log(JSON.stringify(file)+JSON.stringify(reader)+'onchange')

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
  // console.log(f)
  // Assuming only image
  var file = this.refs.file3.files[0];
  var reader = new FileReader();
  var url = reader.readAsDataURL(file);
  // console.log(JSON.stringify(file)+JSON.stringify(reader)+'onchange')

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
checkout=()=>{
  var Formdata = new FormData()
  if (this.state.selectedFile1)
  { 
     Formdata.append("image", this.state.selectedFile1);
     Formdata.append("des_1", this.state.comments.des_1);

    }
  if (this.state.selectedFile1){
    Formdata.append("image", this.state.selectedFile2);
    Formdata.append("des_2", this.state.comments.des_2);
  }
  if (this.state.selectedFile1){
    Formdata.append("image", this.state.selectedFile3);
    Formdata.append("des_3", this.state.comments.des_3);
  }
  if (this.state.selectedFile1){
    Formdata.append("image", this.state.selectedFile4);
    Formdata.append("des_4", this.state.comments.des_4);
  }
    new Apimanager().postroute('warehouse_manager/item_checkout',{item:this.state.item._id, checkout_reason:this.state.checkout_reason,focal_contact:this.state.focal_contact})
  
    .then(res=>{
     if(res.data){
      //  console.log(res.data,"cat")
       this.setState({
         checkout_id:res.data.checkout_id
       })
       console.log(res.data+"id")
       }
    }).then(()=>{
     new Apimanager().postrouteFormdata(`warehouse_manager/item_checkout/upload/${this.state.item.item_id}/${this.state.checkout_id}`,Formdata).then((res)=>{
       if(res.data){
         this.setState({
           alert: (
               <SweetAlert
                   success
                   style={{display: "block",marginTop: "100px"}}
                   title="Successfully Checked Out!"
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
                  title="Network Error !"
                  onConfirm={() => this.setState({alert: null})}
                  onCancel={() => this.setState({alert: null})}
                  confirmBtnBsStyle="info"
              >
              </SweetAlert>
          )
      })
       }
     }).catch(e=>{console.log(e)})
    }).catch(e=>{console.log(e)})
}
  render() {
    console.log(this.state.checkout_reason)
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Checkout"
                content={
                  <form>
                     <Row >
                      <Col  md={5}></Col>
                      <Col xs={6}>
                           <Image
                          src={`${config.url}public/images/${this.state.item.picture_pathway}`}
                          roundedCircle
                          style={{width:200,height:200,
                            borderWidth: 2,
                            borderRadius: 200,}}
                        />
                      </Col>
                      <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Checkout Id",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Checkout Id",
                          defaultValue: this.state.checkout_id,
                          disabled: true,
                          onChange: (evt) => {
                            this.setState({ checkout_id: evt.target.value });
                          },
                        },
                        {
                          label: "Focal Contact",
                          type: "text",
                          defaultValue: this.state.focal_contact,
                          bsClass: "form-control",
                          placeholder: "Focal Contact",
                          onChange: (evt) => {
                            this.setState({ focal_contact: evt.target.value });
                          },
                        },
                      ]}
                    />
                      <Col>
                      <DropdownButton
                          value={this.state.checkout_reason}
                            bsStyle="default"
                            bsSize="large"
                            title={this.state.checkout_reason ?this.state.checkout_reason: "Select A Category"}
                          >
                          <MenuItem
                                  onSelect={(val) =>
                                    {console.log(val);this.setState({
                                      checkout_reason:'Maintainance'
                                    })
                                  }}
                                >
                                 Maintainance
                                </MenuItem>
                                <MenuItem
                                  onSelect={(val) =>
                                    this.setState({
                                      checkout_reason:'Customer Request'
                                    })
                                  }
                                >
                                  Customer Request
                                </MenuItem>
                          </DropdownButton>
                      </Col>
                      <Col md={3}>
                        <Image
                          src={this.state.imgSrc[0]}
                          style={{ width: 150, height: 100, borderWidth: 2 }}
                        />
                      </Col>
                    { this.state.imgSrc[0]&&
                     <Col md={3}>
                        <Image
                          src={this.state.imgSrc[1] }
                          style={{ width: 150, height: 100, borderWidth: 2 }}
                        />
                      </Col>}
                      {this.state.imgSrc[1]&&  <Col md={3}>
                        <Image
                          src={this.state.imgSrc[2]}
                          style={{ width: 150, height: 100, borderWidth: 2 }}
                        />
                      </Col>}
                   {this.state.imgSrc[2]&&   <Col md={3}>
                        <Image
                          src={ this.state.imgSrc[3]}
                          roundedCircle
                          style={{ width: 150, height: 100, borderWidth: 2 }}
                        />
                      </Col>}
                    </Row>
                    <Row>
                      <Row>
                       <Col md={3}>
                          <input
                            ref="file0"
                            type="file"
                            name="user[image]"
                            multiple="true"
                            onChange={this._onChange0}
                          />
                        </Col>
                        {this.state.imgSrc[0]&&  <Col md={3}>
                          <input
                            ref="file1"
                            type="file"
                            name="user[image]"
                            multiple="true"
                            onChange={this._onChange1}
                          />
                        </Col>}
                       {this.state.imgSrc[1]&& <Col md={3}>
                          <input
                            ref="file2"
                            type="file"
                            name="user[image]"
                            multiple="true"
                            onChange={this._onChange2}
                          />
                        </Col>}
                      {this.state.imgSrc[2]&&  <Col md={3}>
                          <input
                            ref="file3"
                            type="file"
                            name="user[image]"
                            multiple="true"
                            onChange={this._onChange3}
                          />
                        </Col>}
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FormInputs
                            ncols={[
                              "col-md-3",
                              "col-md-3",
                              "col-md-3",
                              "col-md-3",
                            ]}
                            properties={[
                              {
                                label: "Item Condition",
                                bsClass: "form-control",
                                componentClass: "textarea",
                                placeholder: "Item Condition",
                                defaultValue: this.state.comments.des_1,
                                onChange: (evt) => {
                                  this.setState({
                                    comments: {...this.state.comments, des_1: evt.target.value },
                                  });
                                },
                              },
                              {
                                label:this.state.imgSrc[0]? "Item Condition":'',
                                bsClass: "form-control",
                                disabled:this.state.imgSrc[0]?false:true,
                                componentClass: "textarea",
                                placeholder:this.state.imgSrc[0]? "Item Condition":'',
                                defaultValue: this.state.comments.des_2,
                                onChange: (evt) => {
                                  this.setState({
                                    comments: {...this.state.comments, des_2: evt.target.value },
                                  });
                                },
                              },
                              {
                                label:this.state.imgSrc[1]? "Item Condition":'',
                                bsClass: "form-control",
                                componentClass: "textarea",
                                disabled:this.state.imgSrc[1]?false:true,
                                placeholder:this.state.imgSrc[1]? "Item Condition":'',
                                placeholder: "Item Condition",
                                defaultValue: this.state.comments.des_3,
                                onChange: (evt) => {
                                  this.setState({
                                    comments: {...this.state.comments, des_3: evt.target.value },
                                  });
                                },
                              },
                              {
                                label:this.state.imgSrc[2]? "Item Condition":'',
                                bsClass: "form-control",
                                componentClass: "textarea",
                                disabled:this.state.imgSrc[2]?false:true,
                                placeholder:this.state.imgSrc[2]? "Item Condition":'',
                                placeholder: "Item Condition",
                                defaultValue: this.state.comments.des_4,
                                onChange: (evt) => {
                                  this.setState({
                                    comments: {...this.state.comments, des_4: evt.target.value },
                                  });
                                },
                              },
                            ]}
                          />
                        </Col> 
                         <Button style={{marginLeft:'45%'}} bsStyle="warning" onClick={this.checkout}>Checkout Item</Button>
                      </Row> 
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
