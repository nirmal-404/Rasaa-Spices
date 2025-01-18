import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { resetProductDetails } from "@/store/shop/products-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {

    const dispatch = useDispatch();
    const { toast } = useToast();
    const { user } = useSelector(state => state.auth)
    function handleAddtoCart(getCurrentProductId) {
        // console.log(getCurrentProductId)
        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })
        ).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast({
                    title: "Product added to cart",
                })
            }
        })
    }

    function handleDialogClose() {
        setOpen(false)
        dispatch(resetProductDetails())
    }
    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <DialogTitle className="sr-only" />
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="">
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-muted-foreground text-2xl mb-5 mt-4">{productDetails?.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""}`}>LKR {productDetails?.price}</p>
                        {
                            productDetails?.salePrice > 0 ? <p className="text-2xl font-bold text-muted-foreground">LKR {productDetails?.salePrice}</p> : null
                        }
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0 5">
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                        </div>
                        <span className="text-muted-foreground">(4.5)</span>
                    </div>
                    <div className="mt-5 mb-5">
                        <Button onClick={() => handleAddtoCart(productDetails?._id)} className="w-full">Add to cart</Button>
                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="grid gap-6">
                            <div className="flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback className="">NP</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Nirmal</h3>
                                    </div>
                                    <div className="flex items-center gap-0 5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className="text-muted-foreground">This is a good product</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback className="">NP</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Nirmal</h3>
                                    </div>
                                    <div className="flex items-center gap-0 5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className="text-muted-foreground">This is a good product</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback className="">NP</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Nirmal</h3>
                                    </div>
                                    <div className="flex items-center gap-0 5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className="text-muted-foreground">This is a good product</p>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <Input placeholder="Write a review..." />
                        <Button>Submit</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;