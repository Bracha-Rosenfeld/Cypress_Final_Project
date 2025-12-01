const XLSX = require("xlsx");
const fs = require("fs");

function writeCartToExcel(filePath, productNames, quantities, prices, subtotals, total) {
    const data = [];

    // Header
    data.push(["Product Name", "Quantity", "Price", "Subtotal"]);

    // Items
    for (let i = 0; i < productNames.length; i++) {
        data.push([
            productNames[i],
            quantities[i],
            prices[i],
            subtotals[i]
        ]);
    }

    // Total row
    data.push(["Total Amount", "", "", total]);

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CartResults");

    // Write file
    XLSX.writeFile(workbook, filePath);
}

module.exports = {
    writeCartToExcel
};
