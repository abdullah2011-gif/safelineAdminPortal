  import React from 'react'
  
import SweetAlert from 'react-bootstrap-sweetalert';
  
  
  export default class Errors extends React.Component{
    state={
      alert:null
    }
    componentDidMount=()=>{
      this.setState({
        alert: (
            <SweetAlert
                danger
                style={{display: "block",marginTop: "100px"}}
                title={`Error 404 !`}
                onConfirm={() =>this.setState({alert: null}) }
                onCancel={() =>this.setState({alert: null}) }
                confirmBtnBsStyle="Danger"
                confirmBtnText='Return'
            >
            </SweetAlert>
        )
    })
    }
render(){
    return(
        <div>
          {this.state.alert}
        </div>
    )
}
  }