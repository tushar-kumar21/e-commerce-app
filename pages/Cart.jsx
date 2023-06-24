import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';

const Cart = () => {

  const [items, setItems] = useState(1);

  const addItems = () => {
    setItems( items + 1)
  }
  const removeItems = () => {
    items >= 1 && setItems( items - 1)
  }

  return (
    <div className="cart-container">
      <div className="cart-navbar">
        <div className="logo-name">
          <Image src={`/assets/shopexpress.jpg`} height={60} width={60} alt="dasd" />
          <span>ShopExpress</span>
        </div>
        <div className="cart-input">
          <input type="text" placeholder="Search for products, brands and more" />
          <Image src={`/assets/search.svg`} height={20} width={20} alt="sdasd" />
        </div>
        <div className="user">
          <span>Sign in</span>
          <Image src={`/assets/cart-account.svg`} height={23} width={23} alt="asa" />
        </div>
      </div>
      <div className="main-cart">
        <div className="cart-items-container">
          <div className="cart-items-category">
            <span>ShopExpress<span>(1)</span></span>
            <span>Grocery</span>
          </div>
          <div className="delivery-address">
            <span>From Saved Address</span>
            <span>Enter Delivery Pincode</span>
          </div>
          <div className="cart-order-details">
          <div className="cart-items">
            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://thumbs.dreamstime.com/z/taj-mahal-sunset-view-mehtab-bagh-banks-river-yamuna-tourist-couple-enjoying-romantic-moment-white-marble-180928460.jpg`} height={100} width={100} alt="" />
            <div>
              <span>MOTOROLA g73 5G (Midnight Blue, 128 GB)</span>
              <span>8GB RAM</span>
              <span>Seller: <span>sadasd</span>
                <span>
                  <Image
                    src={`/assets/shopexpress.jpg`}
                    height={15}
                    width={15}
                    alt="dasd"
                  />
                  <span>Assured</span>
                </span></span>
              <span><span>₹4,666</span> <span
                style={{
                  color: 'green',
                  fontSize: '.8rem'
                }}>20% 0ff</span></span>
            </div>
            <span>Delivery by Wed june 28 | <span
              style={{ color: "green" }}>Free</span> <span style={{ textDecoration: 'line-through', color: '#808080' }}>₹40</span></span>
          </div>
          <div className="cart-order">
            <span>
              <span onClick={removeItems}>-</span>
              <span>{items}</span>
              <span onClick={addItems}>+</span>
            </span>
            <span>SAVE FOR LATER</span>
            <span>REMOVE</span>
          </div>
          <div className="cart-items">
            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://thumbs.dreamstime.com/z/taj-mahal-sunset-view-mehtab-bagh-banks-river-yamuna-tourist-couple-enjoying-romantic-moment-white-marble-180928460.jpg`} height={100} width={100} alt="" />
            <div>
              <span>MOTOROLA g73 5G (Midnight Blue, 128 GB)</span>
              <span>8GB RAM</span>
              <span>Seller: <span>sadasd</span>
                <span>
                  <Image
                    src={`/assets/shopexpress.jpg`}
                    height={15}
                    width={15}
                    alt="dasd"
                  />
                  <span>Assured</span>
                </span></span>
              <span><span>₹4,666</span> <span
                style={{
                  color: 'green',
                  fontSize: '.8rem'
                }}>20% 0ff</span></span>
            </div>
            <span>Delivery by Wed june 28 | <span
              style={{ color: "green" }}>Free</span> <span style={{ textDecoration: 'line-through', color: '#808080' }}>₹40</span></span>
          </div>
          <div className="cart-order">
            <span>
              <span onClick={removeItems}>-</span>
              <span>{items}</span>
              <span onClick={addItems}>+</span>
            </span>
            <span>SAVE FOR LATER</span>
            <span>REMOVE</span>
          </div>
          <div className="cart-items">
            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://thumbs.dreamstime.com/z/taj-mahal-sunset-view-mehtab-bagh-banks-river-yamuna-tourist-couple-enjoying-romantic-moment-white-marble-180928460.jpg`} height={100} width={100} alt="" />
            <div>
              <span>MOTOROLA g73 5G (Midnight Blue, 128 GB)</span>
              <span>8GB RAM</span>
              <span>Seller: <span>sadasd</span>
                <span>
                  <Image
                    src={`/assets/shopexpress.jpg`}
                    height={15}
                    width={15}
                    alt="dasd"
                  />
                  <span>Assured</span>
                </span></span>
              <span><span>₹4,666</span> <span
                style={{
                  color: 'green',
                  fontSize: '.8rem'
                }}>20% 0ff</span></span>
            </div>
            <span>Delivery by Wed june 28 | <span
              style={{ color: "green" }}>Free</span> <span style={{ textDecoration: 'line-through', color: '#808080' }}>₹40</span></span>
          </div>
          <div className="cart-order">
            <span>
              <span onClick={removeItems}>-</span>
              <span>{items}</span>
              <span onClick={addItems}>+</span>
            </span>
            <span>SAVE FOR LATER</span>
            <span>REMOVE</span>
          </div>
          <div className="cart-items">
            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://thumbs.dreamstime.com/z/taj-mahal-sunset-view-mehtab-bagh-banks-river-yamuna-tourist-couple-enjoying-romantic-moment-white-marble-180928460.jpg`} height={100} width={100} alt="" />
            <div>
              <span>MOTOROLA g73 5G (Midnight Blue, 128 GB)</span>
              <span>8GB RAM</span>
              <span>Seller: <span>sadasd</span>
                <span>
                  <Image
                    src={`/assets/shopexpress.jpg`}
                    height={15}
                    width={15}
                    alt="dasd"
                  />
                  <span>Assured</span>
                </span></span>
              <span><span>₹4,666</span> <span
                style={{
                  color: 'green',
                  fontSize: '.8rem'
                }}>20% 0ff</span></span>
            </div>
            <span>Delivery by Wed june 28 | <span
              style={{ color: "green" }}>Free</span> <span style={{ textDecoration: 'line-through', color: '#808080' }}>₹40</span></span>
          </div>
          <div className="cart-order">
            <span>
              <span onClick={removeItems}>-</span>
              <span>{items}</span>
              <span onClick={addItems}>+</span>
            </span>
            <span>SAVE FOR LATER</span>
            <span>REMOVE</span>
          </div>
          </div>
          <div className="place-order">
            <button>PLACE</button>
          </div>
        </div>
        <div className="cart-price-details">
          <h2>PRICE DETAILS</h2>
          <li><span>Price (4 items) </span> <span>₹30,000</span></li>
          <li><span>Discount</span> <span>-₹6000</span></li>
          <li><span>Delivery Charges</span> <span>Free</span></li>
          <li><span>Secured Packaging Fee</span> <span>₹49</span></li>
          <li><span>Total Amount</span> <span>₹23,000</span></li>
          <span>You will save <span>₹6000</span> on this order</span>
        <h3><SecurityTwoToneIcon sx={{color:'#5b18ac'}}/>Safe and Secure Payments.Easy Returns. 100% Authentic Products.</h3>
        </div>
      </div>
      
    </div>
  )
}
export default Cart;