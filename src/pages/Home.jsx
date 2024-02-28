import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const BuyNowButton = ({ product }) => {
  const { isLoading, isAuthenticated, loginWithRedirect,getAccessTokenSilently } = useAuth0();

  const buy = async () => {
    // We need an access token for our API to get the
    // Stripe Customer ID from
    const access_token = await getAccessTokenSilently();
  
  
        console.log(access_token)
      
  };

  if (isLoading) return <></>;

  if (isAuthenticated) return <button onClick={buy}>Buy Now</button>;

  return <button onClick={loginWithRedirect}>Log In To Purchase</button>;
};

export const Home = () => {

  const [products, setProducts] = useState([]);


  const stripeApi = async () => {
    const respuesta = await fetch('http://localhost:5000/api/v1/stripe')
    const { body } = await respuesta.json()
    // const resp=body.map((producto)=>producto)
    // console.log("respuesta",resp)
    console.log(body)
    setProducts(body)

  }


  useEffect(() => {
    // fetch("http://localhost:5000/api/v1/stripe",{
    //     mode:'cors',
    //     cache:'force-cache'
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setProducts(json);
    //   });

    stripeApi()
  }, [setProducts]);

  return (

    <>
      <pre>{JSON.stringify(products, null, 3)}</pre>
      <h1>Home</h1>
      <p>Welcome to my web store!</p>

      {/* {
        products.map((product,index) => <p key={index}>{product}</p>)
      } */}
      <div className="products">
        {products &&
          products.map((product) => {
            return (
              <div className="product" key={product.id}>
                <h2>{product.name}</h2>
                <p className="img">
                  <img src={product.images[0]} alt={product.name} />
                </p>
                <p className="sku">SKU: {product.id}</p>
                <p className="description">{product.description}</p>
                <p className="price">
                  ${(product.prices[0].unit_amount / 100)
                    .toFixed(2)}
                </p>
                <p className="buynow">
                  <BuyNowButton product={product} />
                </p>
              </div>
            );
          })}
      </div>
    </>

  )
}
