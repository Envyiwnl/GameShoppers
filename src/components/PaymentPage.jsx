import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";
import { RiBillFill } from "react-icons/ri";
import { PiLineVerticalBold } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import logo from "../assets/logo.png";

function PaymentPage() {
  const { state } = useLocation();
  const { cartItems: contextCartItems } = useCart();

  const gameItem = state?.gameItem;
  const cartItems = gameItem ? [gameItem] : contextCartItems;

  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const baseAmount = cartItems.length * 500;
  const gst = baseAmount * 0.28;
  const totalAmount = baseAmount + gst;

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!phone) return alert("Enter a valid phone number.");
    try {
      const res = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) setOtpSent(true);
      else alert("Failed to send OTP");
    } catch (err) {
      console.error("Error sending OTP:", err);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      if (data.success) setVerified(true);
      else alert("Invalid OTP");
    } catch (err) {
      console.error("Error verifying OTP:", err);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-white text-center mt-10">
        No items to process for payment.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 gap-6">
      <div className="flex flex-col items-center lg:ml-4 lg:block hidden">
        <img src={logo} alt="logo" className="w-[300px] h-[300px] p-1" />
        <h2 className="text-lg font-bold text-white text-opacity-40 text-center leading-snug mt-2">
          GameShoppers — Level Up Your Game Library.
        </h2>
      </div>

      <div className="flex flex-col items-center lg:hidden">
        <img src={logo} alt="logo" className="w-40 h-40 p-1" />
      </div>

      <div className="hidden lg:flex items-center mx-4">
        <PiLineVerticalBold size={160} className="text-white opacity-50" />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full">
        <form className="bg-gray-800 bg-opacity-30 backdrop-blur-md p-8 rounded-xl shadow-2xl w-[90%] max-w-[450px] h-[550px] flex flex-col gap-4 items-center">
          <h2 className="text-3xl font-bold mb-2 text-white text-opacity-40">
            Secure Payment
          </h2>

          <input
            className="h-9 bg-gray-500 text-white focus:outline-none placeholder-white placeholder-opacity-70 p-4 rounded-md w-80"
            placeholder="Card Number"
            value={card.number}
            onChange={(e) => setCard({ ...card, number: e.target.value })}
          />
          <input
            className="h-9 bg-gray-500 text-white focus:outline-none placeholder-white placeholder-opacity-70 p-4 rounded-md w-80"
            placeholder="Expiry Date"
            value={card.expiry}
            onChange={(e) => setCard({ ...card, expiry: e.target.value })}
          />
          <input
            type="password"
            className="h-9 bg-gray-500 text-white focus:outline-none placeholder-white placeholder-opacity-70 p-4 rounded-md w-80"
            placeholder="CVV"
            value={card.cvv}
            onChange={(e) => setCard({ ...card, cvv: e.target.value })}
          />
          <input
            className="h-9 bg-gray-500 text-white focus:outline-none placeholder-white placeholder-opacity-70 p-4 rounded-md w-80"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            onClick={(e) => sendOtp(e)}
            className="text-white border border-white px-4 py-2 rounded hover:bg-black opacity-50 transition"
          >
            Send OTP
          </button>

          {otpSent && (
            <>
              <input
                className="h-9 bg-gray-500 text-white focus:outline-none placeholder-white placeholder-opacity-70 p-4 rounded-md w-80"
                placeholder="Enter OTP"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                onClick={(e) => verifyOtp(e)}
                className="text-white border border-white px-4 py-2 rounded hover:bg-green-500 opacity-50 hover:text-black transition"
              >
                Verify OTP & Pay
              </button>
            </>
          )}

          {verified && (
            <p className="flex items-center gap-2 mt-2 text-green-400">
              <SiTicktick /> Transaction Successful
            </p>
          )}
        </form>

        <div className="bg-gray-800 bg-opacity-30 backdrop-blur-md p-8 rounded-xl shadow-2xl w-[90%] max-w-[450px] h-[550px] text-white overflow-y-auto">
          <h2 className="flex items-center gap-2 text-2xl font-bold mb-4 text-opacity-40">
            <RiBillFill /> Bill Summary
          </h2>

          <ul className="space-y-2 text-white text-opacity-60 max-h-40 overflow-y-auto mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="truncate">• {item.title}</span>
                <span className="text-green-400 whitespace-nowrap">₹500</span>
              </li>
            ))}
          </ul>

          <hr className="border-gray-600 mb-4" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>₹{baseAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (28%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-white mt-2">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;