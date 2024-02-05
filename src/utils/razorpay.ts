import axiosClient from "@/axios/axiosClient";
import { toast } from "react-toastify";

export function loadRazorpayScript() {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}


export const handleBuyProduct = async (productType:string, productId:string) => {

    const payload = {
      type: productType,
      product_id: productId
    }

    try {
      //send the course details to backend
      const response = await axiosClient.post('payment/create-order', payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      })

      const options = response.data.data.options;
      //load the razorpay script
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        toast.error("Error in Loding Payment Section.");
        return;
      }

      // done to avoid typescript error
      const _window = window as any;
      const paymentObject = new _window.Razorpay(options);
      paymentObject.open();

    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "An error occurred. Please try again later.";
      toast.error(errorMessage);
    }
  }