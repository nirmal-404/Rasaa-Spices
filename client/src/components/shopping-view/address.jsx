import { useDebugValue, useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";

const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    postalcode: "",
    notes: "",
}

function Address() {

    const [formData, setFormdata] = useState(initialAddressFormData)
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const dispatch = useDispatch()
    const { toast } = useToast()
    const { user } = useSelector(state => state.auth)
    const { addressList } = useSelector(state => state.shopAddress)

    function handleManageAddress(event) {
        event.preventDefault();


        if (currentEditedId !== null) {
            dispatch(editAddress(
                { userId: user?.id, addressId: currentEditedId, formData, }
            )).then(data => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id))
                    setCurrentEditedId(null)
                    setFormdata(initialAddressFormData)
                    toast({
                        title: "Address updated successfully"
                    })
                }
            })
        } else {
            if (!(addressList.length >= 3)) {
                dispatch(addNewAddress(
                    { userId: user?.id, ...formData, }
                )).then(data => {
                    if (data?.payload?.success) {
                        toast({
                            title: "Address added successfully"
                        })
                        setFormdata(initialAddressFormData)
                    } else {
                        toast({
                            title: data?.payload?.message,
                            variant: "destructive",
                        });
                    }
                    dispatch(fetchAllAddresses(user?.id))
                }
                )
            } else {
                console.log(addressList.length);
                
                toast({
                    title: `Only 3 addresses can be added curent count ${addressList.length}`,
                    varient: "destructive"
                })
            }
        }



    }






    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key]?.trim() !== "")
            .every((item) => item);
    }


    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id)
        setFormdata({
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            postalcode: getCurrentAddress?.postalcode,
            notes: getCurrentAddress?.notes,
        })
    }

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id }))
            .then(data => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id))
                    toast({
                        title: "Address deleted success"
                    })
                }
            })
    }
    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id))
    }, [dispatch])


    // console.log(formData, "formData");
    // console.log(addressList, "addressList");

    return (
        <Card>
            <div className="mb-3 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {
                    addressList && addressList.length > 0 ?
                        addressList.map(address =>
                            <AddressCard
                                addressInfo={address}
                                handleDeleteAddress={handleDeleteAddress}
                                setCurrentEditedId={setCurrentEditedId}
                                handleEditAddress={handleEditAddress}
                                key={address._id}
                            />) :
                        null
                }
            </div>
            <CardHeader>
                <CardTitle>
                    {
                        currentEditedId !== null ?
                            "Edit Address" :
                            "Add New Address"
                    }
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData} setFormData={setFormdata}
                    buttonText={
                        currentEditedId !== null ?
                            "Edit" :
                            "Add"
                    }
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
    );
}

export default Address;