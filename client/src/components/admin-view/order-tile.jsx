import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";


function OrderTile({ orderItem, handleGetOrderDetails, handleAlertTrigger }) {
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
                <div className="flex space-x-2">
                    <Button onClick={() => handleGetOrderDetails(orderItem?._id)}>
                        View details
                    </Button>
                    <Button variant="destructive" onClick={() => handleAlertTrigger(orderItem?._id)}>
                        Cancel
                    </Button>
                </div>

            </TableCell>
        </TableRow>
    );
}

export default OrderTile;