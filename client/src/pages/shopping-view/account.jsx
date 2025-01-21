
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import accountImage from "../../assets/images/account.png"
import Orders from "@/components/shopping-view/orders"
import Address from "@/components/shopping-view/address"
import Wishlist from "@/components/shopping-view/wishlist"


function ShoppingAccount() {

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
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="wishList">WishList</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <Orders/>
            </TabsContent>

            <TabsContent value="address">
              <Address />
            </TabsContent>

            <TabsContent value="wishList">
              <Wishlist />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount
