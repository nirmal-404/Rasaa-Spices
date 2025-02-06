import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"
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

import SpicesCategoryImage from "../../assets/images/category icons/category-spices.jpg"
import PowdersCategoryImage from "../../assets/images/category icons/category-powders.jpg"
import CrushedAndRoastedCategoryImage from "../../assets/images/category icons/category-crushed.jpg"
import HealthyRangeCategoryImage from "../../assets/images/category icons/category-healthy.jpg"

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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  const heroImages = useSelector(state => state.commonHero)

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen"
    >
      {/* Hero Slider */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[600px] overflow-hidden"
      >
        {heroImages && heroImages?.heroImageList && heroImages?.heroImageList.length > 0 ?
          heroImages?.heroImageList.map((slide, index) => (
            <img
              src={slide?.image}
              key={index}
              alt={`Slide ${index + 1}`}
              className={`${index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-5 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            />
          )) : null
        }
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + heroImages?.heroImageList.length) %
                heroImages?.heroImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 text-primary hover:bg-slate-200"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % heroImages?.heroImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 text-primary hover:bg-slate-200"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* Categories Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-8 text-primary"
          >
            Shop by Category
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {categoriesWithIcons.map((categoryItem, index) => (
              <motion.div
                key={categoryItem.id}
                variants={itemVariants}
              >
                <Card
                  onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
                >
                  <div
                    style={{ backgroundImage: `url(${categoryItem.icon})` }}
                    className="absolute inset-0 bg-cover bg-center overflow-hidden"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-20 transition-all duration-300" />

                  <CardContent className="relative flex flex-col items-center justify-center p-6 h-48">
                    <span className="font-bold text-center text-white text-xl drop-shadow-lg">
                      {categoryItem.label}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-8 text-primary"
          >
            Featured Products
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {productList && productList.length > 0 ?
              productList.map((productItem, index) => (
                <motion.div
                  key={productItem._id}
                  variants={itemVariants}
                >
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                </motion.div>
              )) : null
            }
          </motion.div>
        </div>
      </motion.section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </motion.div>
  )
}

export default ShoppingHome;