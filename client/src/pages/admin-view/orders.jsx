import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Dialog } from "../../components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import AdminOrderDetailsDialog from "../../components/admin-view/order-details";
import OrderTile from "../../components/admin-view/order-tile";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice";



function AdminOrders() {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const { orderList, orderDetails } = useSelector(state => state.adminOrder)
  const dispatch = useDispatch()

  function handleGetOrderDetails(getCurrentOrderId) {
    console.log(getCurrentOrderId);
    dispatch(getOrderDetailsForAdmin(getCurrentOrderId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  // console.log(orderList, "orderList");
  console.log(orderDetails, "orderDetails");


  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0 ?
                orderList.map((orderItem) => (
                  <OrderTile
                  key={orderItem?._id}
                    orderItem={orderItem}
                    handleGetOrderDetails={handleGetOrderDetails}
                  />
                )) :
                null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AdminOrderDetailsDialog
        open={openDetailsDialog} setOpen={setOpenDetailsDialog}
        orderDetails={orderDetails}
      />
    </div>
  );
}

export default AdminOrders;