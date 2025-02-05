import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  phoneNumber: "",
  password: "",
};

function AuthRegister({ handleLoginDialogOpen }) {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key]?.trim() !== "")
      .every((item) => item);
  }
  console.log(formData);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="sr-only">register</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create new account
          </h1>
          <p className="mt-2">
            Already have an account ?
            <Button
              onClick={handleLoginDialogOpen}
              variant="outline"
              className="p-1 ml-2 h-8"
            >
              Login
            </Button>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          isBtnDisabled={!isFormValid()}
        />
      </div>
    </DialogContent>
  );
}

export default AuthRegister;
