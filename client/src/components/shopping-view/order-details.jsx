import { Badge } from "lucide-react";
import { DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


function ShoppingOrderDetailsView({ orderDetails }) {

    const { user } = useSelector((state) => state.auth);


    return (
        <DialogContent className="sm:max-w-[600px] max-h-[800px] overflow-y-auto">
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-medium">Order ID</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>LKR {orderDetails?.totalAmount}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label>
                            <div
                                className={`py-1 px-3 rounded-full text-muted ${orderDetails?.orderStatus === "confirmed"
                                    ? "bg-green-500"
                                    : orderDetails?.orderStatus === "rejected"
                                        ? "bg-red-600 text-muted"
                                        : "bg-black text-muted"
                                    }`}
                            >
                                <span>{orderDetails?.orderStatus}</span>
                            </div>

                        </Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <Table className="grid gap-3">
                            <TableHeader className="">
                                <TableRow className="flex items-center justify-between">
                                    <TableHead className="w-2/4">title</TableHead>
                                    <TableHead className="w-1/4">quantity</TableHead>
                                    <TableHead className="w-1/4">price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="max-h-[200px] overflow-y-auto">
                                {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                                    orderDetails?.cartItems.map((item) => (
                                        <TableRow
                                            key={item.productId}
                                            className="flex items-center justify-between"
                                        >
                                            <TableCell className="w-2/4 py-1.5">{item.title}</TableCell>
                                            <TableCell className="w-1/4 py-1.5">{item.quantity}</TableCell>
                                            <TableCell className="w-1/4 py-1.5">LKR {item.price}</TableCell>
                                        </TableRow>
                                    )) :
                                    null}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>{user?.firstName.charAt(0).toUpperCase() + user?.firstName.slice(1).toLowerCase() + " " + user?.lastName.charAt(0).toUpperCase() + user?.lastName.slice(1).toLowerCase()}</span>
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.pincode}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                            <span>{orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
}

export default ShoppingOrderDetailsView;