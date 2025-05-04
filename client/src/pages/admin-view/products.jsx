import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import { CodeSquare, IndentIcon } from "lucide-react";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { handleProductReportGenaration } from '../../components/admin-view/helpers/product-report-genaration'
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts)
  const dispatch = useDispatch()
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault()

    currentEditedId !== null ?
      dispatch(editProduct(
        {
          id: currentEditedId,
          formData
        }
      )).then((data) => {
        console.log(data, "edit")
        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          setFormData(initialFormData)
          setOpenCreateProductsDialog(false)
          setCurrentEditedId(null)

        }
      }) :

      dispatch(addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })).then((data) => {
        console.log(data, "uploaded product")
        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          setOpenCreateProductsDialog(false)
          setImageFile(null)
          setFormData(initialFormData)
          toast({
            title: "Product added"
          })
        }
      })
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  // console.log(productList, "product list", formData);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-between">
        <Button onClick={() => handleProductReportGenaration(productList)}>
          Download
        </Button>

        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
            productList.map(
              (productItem, index) => (
                <AdminProductTile
                  setFormData={setFormData}
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                  setCurrentEditedId={setCurrentEditedId}
                  product={productItem}
                  handleDelete={handleDelete}
                  key={productItem.id || index}
                />
              )
            )
            : null
        }

      </div>
      <Sheet open={openCreateProductsDialog} onOpenChange={() => {
        setOpenCreateProductsDialog(false)
        setCurrentEditedId(null)
        setFormData(initialFormData)
      }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null ? "Edit Product" : "Add New Product"
              }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile} setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData} setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
