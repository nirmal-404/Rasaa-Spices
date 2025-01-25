import * as checkoutNodeJssdk from "@paypal/checkout-server-sdk";

const environment = new checkoutNodeJssdk.core.SandboxEnvironment(
    "AYBBCttxZhgwIaS1PId9pxmXStmHsyNTAq-tCFGCXEdEZLQ7h2Oj6FrcvNZHpKWTJOTuyDLZG8zWP8wj",
    "EOhXLF25MUxO2Axya_NbPa4APME0LjNa7inTBEr4mNnTmUQeOxlzuHg4J7kTbYe1sZ8DGsXaeGyq0V3K"
);
const client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

export default client;
