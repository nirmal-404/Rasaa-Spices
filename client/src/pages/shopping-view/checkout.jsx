import Address from "@/components/shopping-view/address";
import accountImage from "../../assets/images/account.png"
import visaMCAEImage from "../../assets/images/checkout-options/visa-mc-ae.png"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import paypalImage from "../../assets/images/checkout-options/paypal.png"
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "../../components/shopping-view/cart-items-content";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { createNewOrder, createNewOrderWithPaypalPayment } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';;

function ShoppingCheckout() {
  const { cartItems } = useSelector(state => state.shopCart)
  const { user } = useSelector(state => state.auth)

  const { approvalURL } = useSelector(state => state.shopOrder)

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false)

  const dispatch = useDispatch()
  const { toast } = useToast();

  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0 ?
      cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
          currentItem?.quantity,
        0
      )
      : 0;

  const handlePayHerePayment = () => {
    const orderData = {
      userId: user?.id,
      cartItems: cartItems.items.map(singleCartItem => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ?
          singleCartItem.salePrice :
          singleCartItem.price,
        quantity: singleCartItem?.quantity,

      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        postalcode: currentSelectedAddress?.postalcode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      paymentMethod: selectedPayment,
      paymentStatus: "PENDING",
      totalAmount: totalCartAmount,
      orderStatus: "PENDING",
      currency: "LKR",
    }

    dispatch(createNewOrder(orderData)).then(
      (data) => {
        if (data?.payload?.success) {
          console.log(data, "data");
          setIsPaymentStart(true)

          const payment = {
            sandbox: true, // true if using sandbox mode
            merchant_id: `${import.meta.env.VITE_MERCHANT_ID}`,
            return_url: `${import.meta.env.VITE_API_URL}/shop/payment-success`,
            cancel_url: `shop/checkout`,
            notify_url: `${import.meta.env.VITE_API_URL}/api/payment/notify`,
            order_id: data?.payload?.orderId,
            items: "Order Payment",
            amount: orderData.totalAmount,
            currency: orderData.currency,
            hash: data?.payload?.paymentHash,
            first_name: user?.firstName,
            last_name: user?.lastName,
            email: user?.email,
            phone: orderData.addressInfo.phone,
            address: orderData.addressInfo.address,
            city: orderData.addressInfo.city,
            country: "Sri Lanka"
          };
          try {
            payhere.startPayment(payment);

          } catch (error) {
            console.error('Error starting payment:', error);
            toast({
              title: "Error starting payment. Please try again.",
              variant: "destructive"
            });
            setIsPaymentStart(false);
          }
        } else {
          setIsPaymentStart(false);
        }
      });

    payhere.onCompleted = function (orderId) {
      console.log("Payment completed. OrderID:", orderId);
      // Redirect or update UI
    };

    payhere.onDismissed = function () {
      console.log("Payment dismissed");
      // Optionally show a message
    };

    payhere.onError = function (error) {
      console.error("PayHere error:", error);
      // Show error feedback
    };
  }

  function handlePaypalPayment() {
    const orderData = {
      userId: user?.id,
      cartItems: cartItems.items.map(singleCartItem => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ?
          singleCartItem.salePrice :
          singleCartItem.price,
        quantity: singleCartItem?.quantity,

      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        postalcode: currentSelectedAddress?.postalcode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      paymentMethod: selectedPayment,
      paymentStatus: "PENDING",
      totalAmount: totalCartAmount,
      orderStatus: "PENDING",
      currency: "USD",
      // paymentId: "",
      // payerId: "",
    }

    dispatch(createNewOrderWithPaypalPayment(orderData)).then((data) => {
      if (data?.payload?.success) {

        setIsPaymentStart(true)
      } else {
        setIsPaymentStart(false)
      }
    })




    //   console.log(orderData, "orderData")
  }

  const handleProceedCheckout = async () => {

    if (cartItems.items.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to cart before proceeding",
        variant: "destructive"
      })
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select an address before proceeding",
        variant: "destructive"
      })
      return;
    }

    if (selectedPayment === null) {
      toast({
        title: "Please select a payment method before proceeding",
        variant: "destructive"
      })
      return;
    } else if (selectedPayment === "PAYHERE") {
      handlePayHerePayment()
    } else if (selectedPayment === "PAYPAL") {
      handlePaypalPayment()
    }
  };


  if (approvalURL) {
    window.location.href = approvalURL;
  }

  // console.log(cartItems, "cartItems");
  // console.log(currentSelectedAddress, "currentSelectedAddress");



  return (
    <div className="flex flex-col mt-4">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountImage}
          alt="account hero image"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="mt-5 p-5">
        <p>Select delivery address</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
          <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
          <div className="flex flex-col gap-4">
            {
              cartItems && cartItems.items && cartItems.items.length > 0 ?
                cartItems.items.map(item => <UserCartItemsContent cartItem={item} key={item.productId} />) :
                null
            }
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">LKR {totalCartAmount}</span>
              </div>
            </div>
            <div className="mt-4 w-full">
              {/* rado option for select payment method paypal or payhere */}
              <span className="font-bold">Select payment Method</span>
              <div className="flex justify-between mb-2">
                <RadioGroup
                  defaultValue=""
                  onValueChange={(value) => setSelectedPayment(value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PAYHERE" id="payhere" />
                    <Label htmlFor="payhere">
                      <img
                        src={visaMCAEImage}
                        alt="PayHere"
                        className="w-[200px]"
                      />
                    </Label>

                    <RadioGroupItem value="PAYPAL" id="paypal" />
                    <Label htmlFor="paypal">
                      <img
                        src={paypalImage}
                        alt="PayPal"
                        className="w-[200px]"
                      />
                    </Label>
                  </div>
                </RadioGroup>


              </div>
              <div className="flex justify-between mb-2">


              </div>

              <Button onClick={handleProceedCheckout} className="w-full mb-1 flex items-center justify-center gap-2">
                {
                  isPaymentStart ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Processing Payment...
                    </>
                  ) : (
                    "Checkout with PayPal"
                  )
                }
              </Button>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout