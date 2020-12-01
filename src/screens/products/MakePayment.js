import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';




 function MakePayment(props) {

  const amount = props.amount / 100;
  const [email, setEmail] = React.useState("")
  const [name, setName] =  React.useState("")
  const [phone, setPhone] =  React.useState("")


// handle form input change
 


React.useEffect(() => {

}, [])


    return (
    <div className="animated fadeInRight faster">
        <IconButton  onClick={props.cancelPayment} edge="start" color="inherit" aria-label="close">
<ArrowBackIcon />
</IconButton>
    <h3>Make Payment</h3>

 <TextField
    onChange={ (e) => setName(e.target.value)}
    value={name}
    className="w-100 mb-3"
    name="name"
    type="text"
    label="Name"
    variant="outlined"
        />
    <TextField
    onChange={ (e) => setEmail(e.target.value)}
    value={email}
      className="w-100 mb-3"
    name="email"
    type="email"
    label="Email"
    variant="outlined"
    />

    <TextField
  onChange={ (e) => setPhone(e.target.value)}
    value={phone}
      className="w-100 mb-3"
    name="phone"
    type="phone"
    label="Phone"
    variant="outlined"
  
    />

  

<div className="text-center mt-5 mb-5 d-flex justify-content-around">
    <Button className="rounded-60 app-green-bg text-white shadow-sm px-3"><span> Proceed </span> <ArrowForwardIcon/></Button>
</div>
        </div>
    )
}

export default MakePayment;
