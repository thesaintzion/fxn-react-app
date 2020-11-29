import React from 'react';
import  ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';





function Header() {
    return (
        <AppBar position="sticky" className="shadow-sm bg-white">
<div className="container">
 <Toolbar variant="dense"  className="d-flex justify-content-between align-content-center align-items-center bg-white">
          <Typography variant="h6" className="mb-0 app-green-color">
            St. Shop
          </Typography>

          <IconButton aria-label="upload picture" component="span">
            <Badge badgeContent={4} color="secondary">
            <ShoppingCartIcon className="app-green-color" />
            </Badge>
          </IconButton>
        </Toolbar>
</div>
       
      </AppBar>
    )
}

export default  Header;

