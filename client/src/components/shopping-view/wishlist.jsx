import { Card } from "../ui/card"
import WishlistProductTile from "./wishlist-product-tiile"

function Wishlist({ wishlistItems }) {

    return (
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
            {
                wishlistItems && wishlistItems.length > 0 ?
                    wishlistItems.map(item =>
                        <WishlistProductTile
                            wishlistItem={item}
                            key={item.productId}
                        />) :
                    null
            }
        </Card>
    );
}

export default Wishlist;