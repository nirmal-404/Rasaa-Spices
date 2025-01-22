import { CircleCheckBig, Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { deleteWishlistItem, updateWishlistQuantity } from "@/store/shop/wishlist-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";

function WishlistProductTile({ wishlistItem }) {

    const { user } = useSelector(state => state.auth)
    const { toast } = useToast();
    const dispatch = useDispatch();

    function handleWishlistitemDelete(getWishlistItem) {
        // console.log(getWishlistItem)
        dispatch(deleteWishlistItem({ userId: user?.id, productId: getWishlistItem?.productId }))
            .then(data => {
                if (data?.payload?.success) {
                    toast({
                        title: (
                            <span className="flex gap-1">
                                Item removed from wishlist <CircleCheckBig className="text-green-500" strokeWidth={3} />
                            </span>
                        ),
                    })
                }
            })
    }

    function handleUpdateQuantity(getWishlistItem, typeOfAction) {
        dispatch(updateWishlistQuantity({
            userId: user?.id,
            productId: getWishlistItem?.productId,
            quantity: typeOfAction === "plus" ? getWishlistItem?.quantity + 1 : typeOfAction === "minus" ? getWishlistItem?.quantity - 1 : getWishlistItem?.quantity
        }
        ))
            .then(data => {
                if (data?.payload?.success) {
                    toast({
                        title: (
                            <span className="flex gap-1">
                                Wishlist item updated <CircleCheckBig className="text-green-500" strokeWidth={3} />
                            </span>
                        )
                    })
                }
            })
    }

    function handleAddToCart(getWishlistItem) {
        // console.log(getWishlistItem)
        dispatch(addToCart({ userId: user?.id, productId: getWishlistItem?.productId, quantity: getWishlistItem?.quantity })
        ).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast({
                    title: (
                        <span className="flex gap-1">
                            Item added to cart <CircleCheckBig className="text-green-500" strokeWidth={3} />
                        </span>
                    ),
                })
            }
        })
    }
    return (
        <Card className="flex items-center space-x-4 p-2">
            <img
                src={wishlistItem?.image}
                alt={wishlistItem?.title}
                className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1">
                <h3 className="font-extrabold">{wishlistItem?.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <Button
                        variant="outline"
                        className={`h-8 w-8 rounded-full ${wishlistItem.quantity === 1 ? "cursor-not-allowed" : ""}`}
                        size="icon"
                        disabled={wishlistItem?.quantity === 1}
                        onClick={() => handleUpdateQuantity(wishlistItem, "minus")}
                    >
                        <Minus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold">{wishlistItem?.quantity}</span>
                    <Button
                        variant="outline"
                        className="h-8 w-8 rounded-full"
                        size="icon"
                        onClick={() => handleUpdateQuantity(wishlistItem, "plus")}
                    >
                        <Plus className="w-4 h-4" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    LKR {(
                        (wishlistItem?.salePrice > 0 ? wishlistItem?.salePrice : wishlistItem?.price) *
                        wishlistItem?.quantity
                    ).toFixed(2)}
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => handleAddToCart(wishlistItem)}
                        className=" bg-primary text-primary-foreground rounded p-1 mt-1 h-8 w-8">
                        <ShoppingCart

                            className="cursor-pointer"
                            size={24}
                        />
                    </Button>
                    <Button
                        onClick={() => handleWishlistitemDelete(wishlistItem)}
                        className="bg-destructive hover:bg-destructive hover:dark text-destructive-foreground rounded p-1 mt-1 h-8 w-8">
                        <Trash
                            className="cursor-pointer"
                            size={24}
                        />
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default WishlistProductTile;