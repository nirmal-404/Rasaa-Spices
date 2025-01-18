import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";

function UserCartItemsContent({ cartItem }) {

  const { user } = useSelector(state => state.auth)
  const { toast } = useToast();
  const dispatch = useDispatch();

  function handleCarttemDelete(getCartItem) {
    dispatch(deleteCartItem({ userId: user?.id, productId: getCartItem?.productId }))
      .then(data => {
        if (data?.payload?.success) {
          toast({
            title: "Cart item deleted succesfully",
          })
        }
      })
  }

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    dispatch(updateCartQuantity({
      userId: user?.id,
      productId: getCartItem?.productId,
      quantity: typeOfAction === "plus" ? getCartItem?.quantity + 1 : typeOfAction === "minus" ? getCartItem?.quantity - 1 : getCartItem?.quantity
    }
    ))
      .then(data => {
        if (data?.payload?.success) {
          toast({
            title: "Cart Item updated successfully"
          })
        }
      })
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className={`h-8 w-8 rounded-full ${cartItem.quantity === 1 ? "cursor-not-allowed" : ""}`}
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          LKR {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}</p>
        <div className=" bg-red-600 rounded-full p-1 mt-1 text-white">
          <Trash
            onClick={() => handleCarttemDelete(cartItem)}
            className="cursor-pointer"
            size={20}
          />
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;