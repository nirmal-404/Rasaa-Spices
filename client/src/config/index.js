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
