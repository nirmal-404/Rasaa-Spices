
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import accountImage from "../../assets/images/account.png"
import Address from "@/components/shopping-view/address"
import Wishlist from "@/components/shopping-view/wishlist"
import { useDispatch, useSelector } from "react-redux"
import { fetchWishlistItems } from "@/store/shop/wishlist-slice"
import { useEffect } from "react"
import ShoppingOrders from "@/components/shopping-view/orders"
import MessageHistory from "@/components/shopping-view/messsage-history"
import { getUserContactForms } from "@/store/shop/contact-slice"


function ShoppingAccount() {

  const { user } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.shopWishlist);
  const { contactList } = useSelector(state => state.shopContact)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlistItems(user?.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserContactForms(user?.email));
  }, [dispatch]);

  console.log(contactList, "contactList");
  
  // console.log(wishlistItems, "WL items");

  return (
    <div className="flex flex-col mt-4">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          src={accountImage}
          alt="account hero image"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow sm">
          <Tabs defaultValue="messeges">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="wishList">WishList</TabsTrigger>
              <TabsTrigger value="messeges">Message History</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>

            <TabsContent value="address">
              <Address />
            </TabsContent>

            <TabsContent value="wishList">
              <Wishlist wishlistItems={wishlistItems && wishlistItems.items && wishlistItems.items.length > 0 ? wishlistItems.items : []} />
            </TabsContent>
            
            <TabsContent value="messeges">
              <MessageHistory contactList={contactList && contactList.length > 0 ? contactList : []}/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount
