import { CircleCheckBig, Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { deleteWishlistItem, updateWishlistQuantity } from "@/store/shop/wishlist-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { Separator } from "../ui/separator";

function WishlistProductTile({ handleGetProductDetails, wishlistItem }) {

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
        <Card className="w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl">
            <CardContent className="p-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <img
                        src={wishlistItem?.image}
                        alt={wishlistItem?.title}
                        className="w-20 h-20 mx-auto sm:mx-0 rounded-lg object-cover"
                    />
                    <div className="flex flex-col">
                        <h3 className="mt-2 sm:mt-0 sm:ml-4 font-extrabold text-center sm:text-left">
                            {wishlistItem?.title}
                        </h3>

                        <Button
                            onClick={() => handleGetProductDetails(wishlistItem?.productId)}
                            className="p-1 mx-auto h-auto" variant="outline">
                            more info
                        </Button>
                    </div>
                </div>

                <Separator className="mt-2" />
                <p className="font-semibold text-center sm:text-left mt-2">
                    LKR {(
                        (wishlistItem?.salePrice > 0 ? wishlistItem?.salePrice : wishlistItem?.price) *
                        wishlistItem?.quantity
                    ).toFixed(2)}
                </p>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
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
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <Button
                        onClick={() => handleAddToCart(wishlistItem)}
                        className="bg-primary text-primary-foreground rounded p-1 mt-1 h-8 w-8"
                    >
                        <ShoppingCart className="cursor-pointer" size={24} />
                    </Button>
                    <Button
                        onClick={() => handleWishlistitemDelete(wishlistItem)}
                        className="bg-destructive hover:bg-destructive hover:dark text-destructive-foreground rounded p-1 mt-1 h-8 w-8"
                    >
                        <Trash className="cursor-pointer" size={24} />
                    </Button>
                </div>
            </CardFooter>

        </Card>

    );
}

export default WishlistProductTile;