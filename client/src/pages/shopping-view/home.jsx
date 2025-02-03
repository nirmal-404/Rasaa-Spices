import { Button } from "@/components/ui/button"
import BannerOne from "../../assets/images/banner/banner-01.jpg"
import BannerTwo from "../../assets/images/banner/banner-02.jpg"
import BannerThree from "../../assets/images/banner/banner-03.jpg"
import SpicesCategoryImage from "../../assets/images/category icons/category-spices.jpg"
import PowdersCategoryImage from "../../assets/images/category icons/category-powders.jpg"
import CrushedAndRoastedCategoryImage from "../../assets/images/category icons/category-crushed.jpg"
import HealthyRangeCategoryImage from "../../assets/images/category icons/category-healthy.jpg"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice"
import ShoppingProductTile from "@/components/shopping-view/product-tile"
import { useNavigate } from "react-router-dom"
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
import { useToast } from "@/components/ui/use-toast"
import ProductDetailsDialog from "@/components/shopping-view/product-details"
import { getHeroImages } from "@/store/common-slice/hero-slice"

const categoriesWithIcons = [
  { id: "spices", label: "Spices", icon: SpicesCategoryImage },
  { id: "powders", label: "Powders", icon: PowdersCategoryImage },
  { id: "crushed-and-roasted", label: "Crushed & Roasted", icon: CrushedAndRoastedCategoryImage },
  { id: "healthy-range-products", label: "Healthy Range", icon: HealthyRangeCategoryImage },
]

function ShoppingHome() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(state => state.shopProducts)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector(state => state.auth)
  // const slides = [BannerOne, BannerTwo, BannerThree]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  const heroImages = useSelector(state => state.commonHero)

  // console.log(heroImages);
  
  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters")

    const currentFilter = {
      [section]: [getCurrentItem.id]
    }

    sessionStorage.setItem("filters", JSON.stringify(currentFilter))
    navigate("/shop/listing")
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
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

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true)
  }, [productDetails])

  useEffect(() => {
    if (!heroImages?.heroImageList || heroImages?.heroImageList.length === 0) return;
  
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroImages?.heroImageList.length);
    }, 3000);
  
    return () => clearInterval(timer);
  }, [heroImages?.heroImageList]);
  

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-low-to-high' }))
  }, [dispatch])

  useEffect(() => {
    dispatch(getHeroImages())
  }, [dispatch])
  // console.log(productList, "productList");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {
          
          heroImages && heroImages?.heroImageList && heroImages?.heroImageList.length > 0 ?
          heroImages?.heroImageList.map((slide, index) => (
          <img
            src={slide?.image}
            key={index}
            className={`${index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-5 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        )) : null
      }
        <Button
          varient="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + heroImages?.heroImageList.length) %
              heroImages?.heroImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform translate-y-1/2 bg-white/80 text-primary hover:bg-slate-200">
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button
          varient="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % heroImages?.heroImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform translate-y-1/2 bg-white/80 text-primary hover:bg-slate-200">
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
              categoriesWithIcons.map(categoryItem =>
                <Card
                  onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                  className="cursor-pointer hover:shadow-xl transition-shadow relative overflow-hidden"
                  key={categoryItem.id}
                >
                  <div style={{ backgroundImage: `url(${categoryItem.icon})` }} className="absolute inset-0 bg-cover bg-center overflow-hidden"></div>
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                  <CardContent className="relative flex flex-col items-center justify-center p-6">
                    <span className="font-bold text-center text-primary-foreground">
                      {categoryItem.label}
                    </span>
                  </CardContent>

                </Card>
              )
            }
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0 ?
              productList.map((productItem) => (<ShoppingProductTile
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddtoCart={handleAddtoCart}
                key={productItem._id} />)) :
              null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog} setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  )
}

export default ShoppingHome