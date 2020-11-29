import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';



 function SingleProduct(prop) {
    return (
        <Card className="product-card position-relative h-100" >
             <div className="category-badge  px-2 text-center shadow-sm">
            <p className="mb-0 text-capitalize text-black">{prop?.product?.category}</p>
        </div>
        <CardMedia className="product-photo bg-light border-bottom" image={prop?.product?.image} title={prop?.product?.title}/>
        <CardContent>
        <p className="text-bold">
            {prop?.product?.title}
        </p>
          <p  className="app-green-color mb-0"> 
           &#8358;{prop?.product?.price?.toLocaleString(undefined, {maximumFractionDigits:2})}
          </p>
        </CardContent>  
      </Card>
    )
}

export default SingleProduct;
