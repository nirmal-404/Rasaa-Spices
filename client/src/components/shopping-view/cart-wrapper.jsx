import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCartItem } from "@/store/shop/cart-slice";
import UserCartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)



    useEffect(() => {
        if (cartItems && cartItems.length > 0) {

            const now = new Date();

            cartItems.forEach(item => {

                const itemDate = new Date(item?.createdAt);
                const diffInDays = (now - itemDate) / (1000 * 60 * 60 * 24);

                if (diffInDays >= 5) {
                    dispatch(deleteCartItem({ userId: user?.id, productId: item?.productId }));
                }
            });
        }
    }, [cartItems, dispatch, user?.id]);

    const totalCartAmount =
        cartItems && cartItems.length > 0
            ? cartItems.reduce((sum, currentItem) => {

                const price = currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price;
                return sum + price * currentItem?.quantity;
            }, 0)
            : 0;

    return (
        <SheetContent className="sm:max-w-md">
            <SheetHeader>
                <SheetTitle className="text-lg font-bold">Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">
                {
                    cartItems && cartItems.length > 0 ? cartItems.map((item) => <UserCartItemsContent cartItem={item} key={item.productId} />) : null
                }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">LKR {totalCartAmount}</span>
                </div>
            </div>
            <Button
                onClick={() => {
                    navigate("/shop/checkout")
                    setOpenCartSheet(false)
                }}
                className="w-full mt-6">Checkout</Button>
        </SheetContent>
    );
}

export default UserCartWrapper;