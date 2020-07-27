
import React, { Component } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import {
  Grid,
  Row,
  Col,
  Modal,
  Table,  
  DropdownButton,
  MenuItem,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Button from "components/CustomButton/CustomButton.jsx";
import Apimanager from '../../NodeFunctions/Functions'
class UserProfile extends Component {
state={
  id:'',
    isorder:false,
    _id:'',
    mode_of_sending:'',
    shipment_id:'',
    comments:'',
    contact_number:'',
    modalShow:false,
    item:{
        name:'',
        comments:'',
        brand_name:'',
        colour:'',
        _id1:''
    },
    items:[],
    closet_id:'',
    cus_det:{},
    ispageloaded:false
}
handleClose=()=>{
  this.setState({modalShow:false,item:{name:'',comments:''}})
}
handleChanges=()=>{
new Apimanager().postroute(`Warehouse_manager/incomming_order/${this.state.id}/orders/${this.state._id}/items`,this.state.item).then((res)=>{
  if(res.status===200){
    console.log(JSON.stringify(res.data)+"res")
  this.setState(prevState=>{
    return{
        items:res.data,//prevState.items.concat({name:this.state.item.name,comments:this.state.item.comments,brand_name:this.state.item.brand_name,colour:this.state.item.colour}),
        modalShow:false,
        item:{
          name:'',
          comments:'',
          brand_name:'',
          colour:'',
          _id1:''
      },
    }})}
})
}
updateform = (val) => {
  new Apimanager().PutrouteByid(`Admin/closets/${this.state.closet_id}`,this.state).then(res=>{
    console.log(res)
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
  })
 };
submitform=()=>{
  var status = false
  if(this.state.items){
    status=false
  }
  this.state.items.map(item=>{
if(!item.verified_status){
  status=false
}
  })
  var cus_det = this.state.cus_det
  cus_det.status = status
  new Apimanager().postroute('Warehouse_manager/incomming_order/email',cus_det).then(res=>{
    if(res.status==200){
     this.setState({
       alert: (
           <SweetAlert
               success
               style={{display: "block",marginTop: "100px"}}
               title="Closet Created!"
               onConfirm={() => this.setState({alert: null})}
               onCancel={() => this.setState({alert: null})}
               confirmBtnBsStyle="info"
           >
           </SweetAlert>
       )
   })
    }
  })
}
deleteitem=(item,key)=>{
  new Apimanager().deleterouteByid(`Warehouse_manager/incomming_order/${parseInt(this.state.id)}/orders/${this.state._id}/items/${this.state.items[key]._id}`).then(res=>{
    console.log(res)
    if(res.status==200){
      this.setState(prevState=>{
        return{
          ...prevState,
          items:res.data,
          alert: (
            <SweetAlert
                success
                style={{display: "block",marginTop: "100px"}}
                title="Item Deleted!"
                onConfirm={() => this.setState({alert: null})}
                onCancel={() => this.setState({alert: null})}
                confirmBtnBsStyle="info"
                confirmBtnText='Ok'
            >
            </SweetAlert>
        )
        }
      });
    }
  })
}
edititems=(item,key)=>{
  new Apimanager().PutrouteByid(`Warehouse_manager/incomming_order/${parseInt(this.state.id)}/orders/${this.state._id}/items/${this.state.item._id1}`,{  name:this.state.item.name,
  comments:this.state.item.comments,
  brand_name:this.state.item.brand_name,
  colour:this.state.item.colour,}).then(res=>{
    console.log(res,"response")
    if(res.status==200){
      this.setState(prevState=>{
        return{
          ...prevState,
          items:prevState.items.map((item,i)=>{
            console.log(item._id+res.data._id+'key')
            if(item._id==res.data._id){
              return{
                brand_name:res.data.brand_name ,
                colour:res.data.colour ,
                comments:res.data.comments ,
                createdAt: res.data.createdAt,
                name:res.data.name ,
                updatedAt:res.data.updatedAt ,
                _id:res.data._id,
              }
            }else{
              return item
            }
          }),
          modalShow:false,
          alert: (
            <SweetAlert
                success
                style={{display: "block",marginTop: "100px"}}
                title="Item Updated!"
                onConfirm={() => this.setState({alert: null})}
                onCancel={() => this.setState({alert: null})}
                confirmBtnBsStyle="info"
                confirmBtnText='Ok'
            >
            </SweetAlert>
        ),
        
        item:{
          name:'',
          comments:'',
          brand_name:'',
          colour:'',
          _id1:''
      },
        }
      })
    }
    this.componentDidMount()
  }).catch(e=>console.log(e))
}
edititemsmodal=(item)=>{
  this.setState({modalShow:true,item:{
  ...item,
  _id1:item._id,
  
  
  }})
}
  componentDidMount=()=>{
    // console.log(JSON.stringify(this.props.location.data)+"thats data i need")
    if(this.props.location.data&&!this.state.ispageloaded){

      const  {data } = this.props.location
      // var dataa = data.split(",");
      console.log(data,"here i am");
      this.setState({
        ...data.detail,
        id:data.id,
        closet_id:data._id,
        cus_det:data.cus_det,
        ispageloaded:true
      });}
  }
  confirmorder=()=>{
        new Apimanager().postroute(`Warehouse_manager/incomming_order/${parseInt(this.state.id)}/orders`,{
          mode_of_sending:this.state.mode_of_sending,
          shipment_id:this.state.shipment_id,
          comments:this.state.comments,
          contact_number:this.state.contact_number,
          closetdet:this.state.closet_id
        }).then((res)=>{
          console.log(res,"response")
          if(res.status==200){
            this.setState({
              ...res.data,
              alert: (
                <SweetAlert
                    success
                    style={{display: "block",marginTop: "100px"}}
                    title="Order Created!"
                    onConfirm={() => this.setState({alert: null})}
                    onCancel={() => this.setState({alert: null})}
                    confirmBtnBsStyle="info"
                    confirmBtnText='Ok'
                >
                </SweetAlert>
            )
            })
          }
        })
  }
  varifiedstatus=(verified_status,prop,key)=>{
    new Apimanager().PutrouteByid(`Warehouse_manager/incomming_order/${parseInt(this.state.id)}/orders/${this.state._id}/items/${this.state.items[key]._id}`,{verified_status:verified_status}).then(res=>{
      console.log(res)
      if(res.status==200){
        this.setState(prevState=>{
          return{
            ...prevState,
            items:prevState.items.map((item,Key)=>Key==key?{...item,verified_status:res.data.verified_status}:{...item})
          }
        });
      }
    })
  }
  render() {
    var datacolour = [
      {name:'Apricot'},{name:'Baby blue'},{name:'Beige'},{name:'Black'},{name:'Blue'},{name:'Blue-green'},{name:'Blue-violet'},{name:'Bronze'},{name:'Brown'},{name:'Chocolate'},{name:'Cobalt blue'},
      {name:'Cyan'},{name:'Desert sand'},{name:'Gold'},{name:'Gray'},{name:'Green'},{name:'Jade'},{name:'Jungle green'},{name:'Maroon'},{name:'Navy blue'},{name:'Olive'},{name:'Orange'},
      {name:'Orange-red'},{name:'Peach'},{name:'Pear'},{name:'Pink'},{name:'Purple'},{name:'Red'},{name:'Silver'},{name:'Violet'},{name:'White'},{name:'Yellow'}
    ]
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add Incoming Orders"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        // {
                        //   label: "Order Id",
                        //   type: "text",
                        //   bsClass: "form-control",
                        //   placeholder: "Order Id",
                        //   defaultValue:this.props.match.params.data==':data'?'': this.state._id,
                        //   disabled:this.props.match.params.data==':data'?false:true,
                        //   onChange: (evt)=>{
                        //     this.setState({_id:evt.target.value})
                        //   },
                        // },
                        {
                          label: "Shipment Id",
                          type: "text",
                          placeholder: "Shipment Id",
                          defaultValue:this.props.match.params.data==':data'?'': this.state.shipment_id,
                          onChange: (evt)=>{
                            this.setState({shipment_id:evt.target.value})
                          },
                        },
                        {
                          label: "Mode of Sending",
                          type: "text",
                          defaultValue:this.props.match.params.data==':data'?'':this.state.mode_of_sending,
                          bsClass: "form-control",
                          placeholder: "Mode of Sending",
                          onChange: (evt)=>{
                            this.setState({mode_of_sending:evt.target.value})
                          },
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        // {
                        //   label: "Shipment Id",
                        //   type: "text",
                        //   placeholder: "Shipment Id",
                        //   defaultValue:this.props.match.params.data==':data'?'': this.state.shipment_id,
                        //   onChange: (evt)=>{
                        //     this.setState({shipment_id:evt.target.value})
                        //   },
                        // },
                        {
                          label: "Contact",
                          type: "text",
                          placeholder: "COntact",
                          defaultValue:this.props.match.params.data==':data'?'': this.state.contact_number,
                          onChange: (evt)=>{
                            this.setState({contact_number:evt.target.value})
                          },
                        },
                        {
                          label: "Comments",
                          type: "text",
                          defaultValue:this.props.match.params.data==':data'?'':this.state.comments,
                          placeholder: "Comments",
                          onChange: (evt)=>{
                            this.setState({comments:evt.target.value})
                          },
                        }
                      ]}
                    />
                     {/* <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "Contact",
                          type: "text",
                          placeholder: "COntact",
                          defaultValue:this.props.match.params.data==':data'?'': this.state.contact_number,
                          onChange: (evt)=>{
                            this.setState({contact_number:evt.target.value})
                          },
                        },
                        
                      ]}
                    /> */}
{!this.state._id&& <Button onClick={this.confirmorder} style={{height:50,width:120,marginLeft:'46%'}} bsStyle="warning">Add Items</Button> 
                        }
              {  this.state._id&&   <Row>
                    <Table striped bordered hover>
  <table style={{width:'90%',marginLeft:'5%'}}>
  <thead>
    <tr style={{height:50,textAlign:'center'}}>
      <th style={{width:'15%',textAlign:'center'}}>Name</th>
      <th style={{width:'15%',textAlign:'center'}}>Comments</th>
      <th style={{width:'15%',textAlign:'center'}}>Brand Name</th>
      <th style={{width:'15%',textAlign:'center'}}>Colour</th>
      <th style={{width:'15%',textAlign:'center'}}>Verified Status</th>
      <th style={{width:'15%',textAlign:'center'}}>Edit</th>
      <th style={{width:'15%',textAlign:'center'}}>Delete</th>
    </tr>
  </thead>
  <tbody>
      {this.state.items.map((item,key)=>{
            return(<tr style={{height:50,textAlign:'center'}}>
                {console.log(item.name)}
                <td style={{width:'15%',textAlign:'center'}}>{item.name}</td>
            <td style={{width:'15%',textAlign:'center'}}>{item.comments}</td>
                <td style={{width:'15%',textAlign:'center'}}>{item.brand_name}</td>
            <td style={{width:'15%',textAlign:'center'}}>{item.colour}</td>
                <td style={{width:'15%',textAlign:'center'}}>
                   <BootstrapSwitchButton
                     onstyle="warning" 
                     offstyle="outline-info"
                     style={{backgroundColor:'black'}}
                      width={70}
                      height={35}
                      checked={item.verified_status}
                      onlabel="YES"
                      offlabel="NO"
                      onChange={(checked) => this.varifiedstatus(checked,item,key)}
                    />{" "}</td>
                    <td style={{width:'33.3%',textAlign:'center'}}><Button onClick={()=>this.edititemsmodal(item,key)}>Edit</Button></td>
            <td style={{width:'33.3%',textAlign:'center'}}><Button onClick={()=>this.deleteitem(item,key)}>Delete</Button></td>
              </tr>)
      })}
    
  </tbody>
  </table>
</Table>
                    </Row>}
                   { this.state._id&& <Row >
                  <Button onClick={()=>this.setState({modalShow:true,item:{
                     name:'',
                     comments:'',
                     brand_name:'',
                     colour:'',
                     _id1:''
                  }})} style={{height:50,width:120,marginLeft:'38%'}} bsStyle="warning">Add Item</Button> 
                         <Button onClick={()=> this.submitform()} bsStyle="warning"style={{height:50,width:120,marginLeft:'5%'}}>Submit</Button> 
                  
                 {this.state.alert}
                    </Row>}
                  </form>
                }
              />
            </Col>
          </Row>
          <Modal show={this.state.modalShow}>
  <Modal.Header onHide={this.handleClose} closeButton>
  </Modal.Header>
  <Row>
            <Col md={12}>
              <Card
                title="Add Items"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Item Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Item Name",
                          defaultValue:this.state.item.name,
                          onChange: (evt)=>{
                            var val = evt.target.value
                          this.setState(prevState=>{
                              return{
                                  ...prevState,
                                  item:{
                                    ...prevState.item,
                                      name:val
                                  }
                              }
                          })
                        },
                        },
                        {
                          label: "Comments",
                          type: "text",
                          defaultValue:this.state.item.comments,
                          bsClass: "form-control",
                          placeholder: "Comments",
                          onChange: (evt)=>{
                              var val = evt.target.value
                            this.setState(prevState=>{
                                return{
                                    ...prevState,
                                    item:{
                                      ...prevState.item,
                                        comments:val
                                    }
                                }
                            })
                          },
                        }
                      ]}
                    />
                     <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Brand Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Brand Name",
                          defaultValue:this.state.item.brand_name,
                          onChange: (evt)=>{
                            var val = evt.target.value
                          this.setState(prevState=>{
                              return{
                                  ...prevState,
                                  item:{
                                      ...prevState.item,
                                      brand_name:val
                                  }
                              }
                          })
                        },
                        },
                        // {
                        //   label: "Colour",
                        //   type: "text",
                        //   defaultValue:this.state.item.colour,
                        //   bsClass: "form-control",
                        //   placeholder: "Colour",
                        //   onChange: (evt)=>{
                        //       var val = evt.target.value
                        //     this.setState(prevState=>{
                        //         return{
                        //             ...prevState,
                        //             item:{
                        //               ...prevState.item,
                        //               colour:val
                        //             }
                        //         }
                        //     })
                        //   },
                        // }
                      ]}
                    />
                    
                    <Row>
                      <Col xs={6}>
                        <label>Item Colour</label>
                        <div>
                          {/* {console.log(JSON.stringify(this.state.selectedFile))} */}
                          <DropdownButton
                          value={this.state.item.colour}
                            bsStyle="default"
                            bsSize="large"
                            height={32}
                            
                            // style={{height:30}}
                            title={this.state.item.colour || "Select A Colour"}
                          >
                            <MenuItem style={{overflowY: 'scroll', maxHeight: 200}} >
                            {datacolour.map((item) => {
                              return (
                                <MenuItem 
                                
                                  onSelect={(val) =>
                                    this.setState(prevState=>{
                                      return{
                                        item:{
                                          ...prevState.item,
                                         colour: item.name,
                                        }
                                      }
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
                  </form>
                }
              />
            </Col>
          </Row>
                {console.log(this.state.items)}
          <div style={{height:60,width:'38%',marginLeft:'31%'}}>
              <span style={{marginRight:'5%'}}>
    <Button variant="secondary" onClick={()=>this.setState({modalShow:false})}>Close</Button>
    </span>
   {this.state.item._id1?<Button  variant="primary" onClick={this.edititems}>Update</Button>: <Button  variant="primary" onClick={this.handleChanges}>Save changes</Button>}
  </div>
</Modal>
        
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
