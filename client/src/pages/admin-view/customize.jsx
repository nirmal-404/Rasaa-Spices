import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addHeroImage, getHeroImages } from "@/store/common-slice/hero-slice";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function AdminEditHero() {

  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const dispatch = useDispatch();
  const heroImages = useSelector(state => state.commonHero)
  const { toast } = useToast()

  function handleUploadHeroImage() {
    dispatch(addHeroImage(uploadedImageUrl)).then(data => {
      if (data?.payload?.success) {
        setImageFile(null)
        setUploadedImageUrl("")
        toast({
          title: 'Hero Image uploaded successfully',
        })
        dispatch(getHeroImages())
      }
    })
  }

  useEffect(() => {
    dispatch(getHeroImages())
  }, [dispatch])
  // console.log(uploadedImageUrl, "uploadedImageUrl");
  console.log(heroImages?.heroImageList, "heroImageList")

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile} setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}
        imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState}
        // isEditMode={currentEditedId !== null}
        isCustomStyling={true}
      />
      <Button
        className="mt-5 w-full"
        onClick={handleUploadHeroImage}
        disabled={uploadedImageUrl.length <= 0}
      >
        Upload
      </Button>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {
          heroImages && heroImages?.heroImageList && heroImages?.heroImageList.length > 0 ?
            heroImages?.heroImageList.map(img => (
              <div className="relative group" key={img?._id}>
                <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="bg-destructive hover:bg-destructive"><Trash className="text-accent" /></Button>
                </div>
                <img
                  src={img?.image}
                  alt="hero image"
                  className="w-full object-cover rounded"
                />
              </div>

            )) :
            <div>no hero images</div>
        }
      </div>
    </div>
  );
}

export default AdminEditHero;
