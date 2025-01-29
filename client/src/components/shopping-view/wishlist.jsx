import { useDispatch, useSelector } from "react-redux";
import { Card } from "../ui/card"
import WishlistProductTile from "./wishlist-product-tiile"
import { fetchProductDetails } from "@/store/shop/products-slice";
import ProductDetailsDialog from "./product-details";
import { useEffect, useState } from "react";

function Wishlist({ wishlistItems }) {

    const { productDetails } = useSelector(state => state.shopProducts)
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const dispatch = useDispatch()

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
    }

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true)
    }, [productDetails])
    return (
        <div>

        <div className="flex">
            {/* submitedQoutes */}
                {/* -----rewspponse data -> obj.iterate(<QuoteCard item={item}>) */}
                    {/* quooteCard  item*/}
{/* quantity, name, price, userge, status */}
                        {/* item.quanti */}

            {/* form */}
        </div>






            <Card className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 md:p-6">
                {
                    wishlistItems && wishlistItems.length > 0 ?
                        wishlistItems.map(item =>
                            <WishlistProductTile
                                handleGetProductDetails={handleGetProductDetails}
                                wishlistItem={item}
                                key={item.productId}
                            />) :
                        null
                }
            </Card>

            <ProductDetailsDialog
                open={openDetailsDialog} setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>

    );
}

export default Wishlist;





//     Quotes - 

//
//          submitted quotes 
//          form 
//          
// 
// 
// 
// 
// 
// 
// 
// 
