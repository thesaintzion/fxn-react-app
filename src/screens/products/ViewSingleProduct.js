import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Slide from '@material-ui/core/Slide';
import iphone from '../../assets/img/iphone.jpg';
import { PersonPinCircleSharp } from '@material-ui/icons';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

function ViewSingleProduct(props) {

    // Close dialog
    const closeDialog = () => {
           props.closeDialog();
    }

  
    
    return (
        <div>
        <Dialog className="product-view-dialog" open={props?.open} onClose={closeDialog}  scroll="paper" TransitionComponent={Transition} >
        <AppBar  position="sticky" className=" app-green-bg">
          <Toolbar variant="dense" >
            <IconButton onClick={closeDialog} edge="start" color="inherit" aria-label="close">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">
              Property Name
            </Typography>
          
          </Toolbar>
        </AppBar>
      <div className="container">
     <img src={iphone} className="w-100"/>
      </div>

    
   
       
             
      </Dialog>
        </div>
    )
}

export default ViewSingleProduct;
