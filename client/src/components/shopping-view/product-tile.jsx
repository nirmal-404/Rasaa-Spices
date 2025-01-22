import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Heart, ShoppingCart } from "lucide-react"
function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
  handleAddtoWishlist,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} item${product?.totalStock !== 1 ? "s" : ""} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
            >
              LKR {product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                LKR {product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex flex-col space-y-2 items-center">
        <Button
          onClick={() => handleAddtoWishlist(product?._id)}
          className="flex items-center w-full"
        >
          <span className="hidden lg:block">Add to wishlist</span>
          <Heart />
        </Button>
        {product?.totalStock === 0 ? (
          <Button className="flex items-center w-full opacity-60 cursor-not-allowed">
            <span className="hidden lg:block">Out Of Stock</span>
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="flex items-center w-full"
          >
            <span className="hidden lg:block">Add to cart</span>
            <ShoppingCart />
          </Button>
        )}
      </CardFooter>


    </Card>
  );
}

export default ShoppingProductTile;
