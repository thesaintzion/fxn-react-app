import React from 'react';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { PaystackButton } from 'react-paystack';
import Snackbar from '@material-ui/core/Snackbar'; 

 function MakePayment(props) {

  const payStackKey = 'pk_test_c588db9c83c7e903a8b7bd5ac3646ada1b2be4a3';
  let m = props.amount;
  const amount = m  * 100;
  const [email, setEmail] = React.useState("")
  const [name, setName] =  React.useState("")
  const [phone, setPhone] =  React.useState("")
  const [snackBarOpen, setSnackBarOpen] = React.useState(false)
  const [ snackBarMessage, setSnackBarMessage] = React.useState("")


  const onSuccess = () =>{
    snackBarShow('Thanks for doing business with us!');
    props.clearCart();
 
  } 
  
  const onClose = () => {
    snackBarShow('Please don\'t go away')
  }

  const snackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };


  const snackBarShow = (m) => {
    setSnackBarOpen(true);
    setSnackBarMessage(m)
  }
  
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey: payStackKey,
    text: "PROCEED",
    onSuccess: onSuccess,
    onClose:  onClose,
  }


    return (
<> 

<Snackbar  anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={snackBarOpen} autoHideDuration={6000} onClose={snackBarClose}> 
<div className="bg-dark text-white px-4 py-2 shadow animated  rounded-60" >{snackBarMessage}</div>
</Snackbar>

    <div className="animated fadeInRight faster">
        <IconButton  onClick={props.cancelPayment} edge="start" color="inherit" aria-label="close">
<ArrowBackIcon />
</IconButton>
    <h3>Make Payment
        {/* <span>{amount.toLocaleString(undefined, {maximumFractionDigits:2})}  | {amount}</span> */}
    </h3>
    <p>All fields are required <span className="text-danger">*</span></p>
<form>
 <TextField
    onChange={ (e) => setName(e.target.value)}
    value={name}
    className="w-100 mb-3"
    name="name"
    type="text"
    label="Name"
    variant="outlined"
    required
        />
    <TextField
    onChange={ (e) => setEmail(e.target.value)}
    value={email}
      className="w-100 mb-3"
    name="email"
    type="email"
    label="Email"
    variant="outlined"
    required
    />

    <TextField
  onChange={ (e) => setPhone(e.target.value)}
    value={phone}
      className="w-100 mb-3"
    name="phone"
    type="phone"
    label="Phone"
    variant="outlined"
    required
    />

  </form>

<div className="text-center mt-5 mb-5 d-flex justify-content-around">
<PaystackButton  id="paystack-btn" className="rounded-60 app-green-bg text-white shadow-sm px-5 btn" {...componentProps} />
{/* <Button onClick={proceed} className="rounded-60 app-green-bg text-white shadow-sm px-3"><span> Proceed </span> <ArrowForwardIcon/></Button> */}
</div>
        </div>
        </>
    )
}

export default MakePayment;
