import { jsPDF } from "jspdf";

export const handleProductReportGenaration = (productList) => {
  const doc = new jsPDF();
  let y = 20;

  // Title
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text("Product Inventory", 80, y);
  y += 15;

  // Header background
  doc.setFillColor(230, 230, 230); // light gray
  doc.rect(10, y, 190, 10, 'F');

  // Headers
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Product Name", 20, y + 7);
  doc.text("Category", 60, y + 7);
  doc.text("Price", 95, y + 7);
  doc.text("Sale Price", 120, y + 7);
  doc.text("Quantity", 150, y + 7);
  doc.text("Total Sale Price", 170, y + 7);
  y += 12;

  if (!productList || productList.length === 0) return;

  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];
    console.log(product)
    const totalSalePrice = product.salePrice * product.totalStock;

    // Alternate row background color
    if (i % 2 === 0) {
      doc.setFillColor(255, 245, 245); // soft pink
    } else {
      doc.setFillColor(245, 245, 245); // soft gray
    }

    doc.rect(10, y - 2, 190, 12, 'F');

    // const imgData = await loadImageAsBase64(product.image);

    // doc.addImage(imgData, "PNG", 12, y, 10, 10); // thumbnail
    doc.setTextColor(60, 60, 60);
    doc.text(product.title, 25, y + 7);
    doc.text(product.category, 60, y + 7);
    doc.text(`${product.price}`, 95, y + 7);
    doc.text(`${product.salePrice}`, 125, y + 7);
    doc.text(`${product.totalStock}`, 155, y + 7);
    doc.text(`${totalSalePrice}`, 180, y + 7);

    y += 15;
  }

  doc.save("product_sheet.pdf");
};

async function loadImageAsBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
