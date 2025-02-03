import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { resetProductDetails } from "@/store/shop/products-slice";
import StarRatingComponent from "../common/star-rating";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const [reviewMsg, setReviewMsg] = useState("");
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { user } = useSelector(state => state.auth)
    const { reviews } = useSelector((state) => state.shopReview);

    function handleRatingChange(getRating) {
        console.log(getRating, "getRating");
        setRating(getRating);
    }

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
        setRating(0);
        setReviewMsg("");
    }

    function handleAddReview() {
        dispatch(
            addReview({
                productId: productDetails?._id,
                userId: user?.id,
                userName: user?.firstName + " " + user?.lastName,
                reviewMessage: reviewMsg,
                reviewValue: rating,
            })
        ).then((data) => {
            if (data.payload.success) {
                setRating(0);
                setReviewMsg("");
                dispatch(getReviews(productDetails?._id));
                toast({
                    title: "Review added successfully!",
                });
            }
        });
    }

    useEffect(() => {
        if (productDetails !== null) dispatch(getReviews(productDetails?._id));
    }, [productDetails]);

    console.log(reviews, "reviews");

    const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] max-h-[90vh] overflow-auto">
                <DialogTitle className="sr-only" />
                <DialogDescription className="sr-only" />
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
                            <StarRatingComponent isDisabled={true} rating={averageReview}/>
                        </div>
                        <span className="text-muted-foreground">{averageReview.toFixed(2)}</span>
                    </div>
                    <div className="mt-5 mb-5">
                        <Button onClick={() => handleAddtoCart(productDetails?._id)} className="w-full">Add to cart</Button>
                    </div>
                    <Separator />
                    <div>
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="grid gap-6 max-h-[200px] overflow-auto">
                            {reviews && reviews.length > 0 ? (
                                reviews.map((reviewItem) => (
                                    <div className="flex gap-4">
                                        <Avatar className="w-10 h-10 border">
                                            <AvatarFallback>
                                                {reviewItem?.userName.split(" ")[0].charAt(0) + reviewItem?.userName.split(" ")[reviewItem?.userName.split(" ").length - 1].charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold">{reviewItem?.userName}</h3>
                                            </div>
                                            <div className="flex items-center gap-0.5">
                                                <StarRatingComponent rating={reviewItem?.reviewValue} />
                                            </div>
                                            <p className="text-muted-foreground">
                                                {reviewItem.reviewMessage}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h1>No Reviews</h1>
                            )}


                        </div>
                        <div className="mt-10 flex flex-col gap-2">
                            <Label>Write a review</Label>
                            <Input
                                name="reviewMsg"
                                value={reviewMsg}
                                onChange={(event) => setReviewMsg(event.target.value)}
                                placeholder="Write a review..."
                            />
                            <div className="flex">
                                <StarRatingComponent
                                    rating={rating}
                                    handleRatingChange={handleRatingChange}
                                />
                            </div>
                            <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;