import { useEffect, useState } from "react";

import ProductCard from "../../components/Home/ProductCard/ProductCard";

import Footer from "../../components/Shared/Footer/Footer";
import Header from "../../components/Shared/Header/Header";

function Home() {
  // Creating a state for products data.
  // whenever there is achange in products, it will force component refresh.

  const [products, setProducts] = useState([]);
  const [itemCount, setItemCount]=useState([0]);
 
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      // calling json function.
      .then((res) => res.json())
      // listening for json function to return.
      .then((res) => {
        res.forEach(o=>{
          o.qty=1;
          o.rating.rate=Math.ceil(Number(o.rating.rate));
        })
        setProducts(res);
      });
     notifyAboutCartAdd();
  }, []);
  
  function notifyAboutCartAdd(){
    let cartItems = localStorage.getItem("cartItems");
    if(cartItems){
      let parsedCartItems = JSON.parse(cartItems);
      setItemCount(parsedCartItems.length);
    }
  }
  

  return (
    <div>
      <Header count={itemCount} />
      {/* Products */}
      
      <div>
        {/* <h1>{click}</h1>
        <h1>{click2}</h1>
       
        <button
          onClick={() => {
            setClick2(click2 + 1);
          }}>
          Click 2
        </button> */}
        {/* <h3>{products && products.length}</h3>
        <h1>{data}</h1> */}

        {/* Products */}
        <div className="row">
          {products.map((product, i) => (
            <div key={product.id} className="col-3">
              <ProductCard 
              key={product.id} 
              item={product} 
              index={i}
              notify={notifyAboutCartAdd} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
