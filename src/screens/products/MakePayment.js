import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { PaystackButton } from 'react-paystack'




 function MakePayment(props) {

  const payStackKey = 'pk_test_35059932bc296eafec72754c75b151d20b6a669c';
//   const amount = props.amount / 100;
  const amount = 50000 / 100;
  const [email, setEmail] = React.useState("")
  const [name, setName] =  React.useState("")
  const [phone, setPhone] =  React.useState("")


  const onSuccess = () =>{
    alert("Thanks for doing business with us! Come back soon!!")
  } 
  
  const onClose = () => {
    alert("Wait! Don't leave :(")
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



  // proceed  btn
  const proceed = () => {
    //   if(name.trim() === "" || email.trim() === "" || phone.trim() === ""){
    //       alert('Please fill in all fields')
    //   }else{
          
    //   }
   document.getElementById('paystack-btn').click();
  }
 
  


 


    return (
    <div className="animated fadeInRight faster">
        <IconButton  onClick={props.cancelPayment} edge="start" color="inherit" aria-label="close">
<ArrowBackIcon />
</IconButton>
    <h3>Make Payment <span>{amount}</span></h3>
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
    )
}

export default MakePayment;
