import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";


function OrderTile({orderItem, handleGetOrderDetails}) {
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
            <TableCell>${orderItem?.totalAmount}</TableCell>
            <TableCell>

                <Button
                    onClick={() => handleGetOrderDetails(orderItem?._id)}
                >
                    View Details
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default OrderTile;