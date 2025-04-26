import { TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";



function ShoppingOrderTile({ orderItem, handleGetOrderDetails }) {
    return (
        <TableRow key={orderItem?._id}>
            <TableCell>{orderItem?._id}</TableCell>
            <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
            <TableCell>
                <Badge
                    className={`py-1 px-3 ${orderItem?.orderStatus === "confirmed"
                        ? "bg-green-500"
                        : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                >
                    {orderItem?.orderStatus}
                </Badge>
            </TableCell>
            <TableCell>LKR {orderItem?.totalAmount}</TableCell>
            <TableCell>
                <Button
                    onClick={() => handleGetOrderDetails(orderItem?._id)}>
                    View Details
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default ShoppingOrderTile;