export const registerFormControls = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter your first name",
    componentType: "input",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter your last name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "gender",
    label: "Gender",
    componentType: "select",
    options: [
      { id: "male", label: "Male" },
      { id: "female", label: "Female" },
      { id: "other", label: "Other" },
    ],
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    componentType: "phoneInput",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];


export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product name",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "spices", label: "Spices" },
      { id: "powders", label: "Powders" },
      { id: "crushed-and-roasted", label: "Crushed and Roasted" },
      { id: "healthy-range-products", label: "Healthy Range Products" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];