import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
// import { ShoppingOrderTile } from "./order-tile"
// import { ShoppingOrderDetailsDialog } from './order-details'
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId, getOrderDetails } from "@/store/shop/order-slice";
import ShoppingOrderDetailsDialog from "./order-details";
import ShoppingOrderTile from "./order-tile";



function ShoppingOrders() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

    function handleGetOrderDetails(getCurrentOrderId) {
        dispatch(getOrderDetails(getCurrentOrderId));
    }

    useEffect(() => {
        dispatch(getAllOrdersByUserId(user?.id));
    }, [dispatch]);

    useEffect(() => {
        if (orderDetails !== null) setOpenDetailsDialog(true);
    }, [orderDetails]);

    // console.log(orderList, "orderList");
    // console.log(orderDetails, "orderDetails");

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
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
                                    <ShoppingOrderTile
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

            <ShoppingOrderDetailsDialog
                open={openDetailsDialog} setOpen={setOpenDetailsDialog}
                orderDetails={orderDetails}
            />
        </div>
    );
}

export default ShoppingOrders;