// describe("Cart Test", () => {

//     it("add 3 items and verify cart", () => {

//         cy.visit("https://www.bodyshop.co.il/");

//         // קטגוריית בשמים
//         cy.get("#menu-item-210208 > a").click();
//         cy.get("h3.wd-entities-title a[href*='white-musk-edt']").click();
//         cy.get("button.single_add_to_cart_button").click();

//         // קטגוריית גברים
//         cy.get("#menu-item-209983 > a").click();
//         cy.get("a.product-image-link[href*='hand-cream-men']").click();
//         cy.get("button.single_add_to_cart_button").click();

//         // קטגוריית ילדות
//         cy.get("#menu-item-209992 > a").click();
//         cy.get("div[data-id='1388']").click();
//         cy.get("button.single_add_to_cart_button").click();

//         cy.get(".woocommerce-mini-cart-item .quantity .plus").click().click();

//         cy.visit("https://www.bodyshop.co.il/cart/");

//         cy.get(".cart_item .product-name").each($el => {
//             cy.log("Product:", $el.text());
//         });
//     });

// });
import { writeCartToExcel } from "../support/utils";

describe("Cart Test", () => {

    it("add 3 items and verify cart + export to excel", () => {

        cy.visit("https://www.bodyshop.co.il/");

        // קטגוריית בשמים
        cy.get("#menu-item-210208 > a").click();
        cy.get("h3.wd-entities-title a[href*='white-musk-perfume-oil']").click();
        cy.get("button.single_add_to_cart_button").click();

        // קטגוריית גברים
        cy.get("#menu-item-209983 > a").click();
        cy.get("a.product-image-link[href*='hand-cream-men']").click();
        cy.get("button.single_add_to_cart_button").click();

        // קטגוריית ילדות
        cy.get("#menu-item-209992 > a").click();
        cy.get("div[data-id='1388']").click();
        cy.get("button.single_add_to_cart_button").click();

        // להגדיל כמות של מוצר בסל הקטן
        cy.get(".woocommerce-mini-cart-item .quantity .plus").click().click();

        cy.visit("https://www.bodyshop.co.il/cart/");

        // איסוף הנתונים מהעגלה
        const productNames = [];
        const quantities = [];
        const prices = [];
        const subtotals = [];

        // שמות מוצרים
        cy.get(".cart_item .product-name").each(($el) => {
            productNames.push($el.text().trim());
        });

        // כמויות
        cy.get(".cart_item .product-quantity input.qty").each(($el) => {
            quantities.push(Number($el.val()));
        });

        // מחיר יחידה
        cy.get(".cart_item .product-price").each(($el) => {
            prices.push($el.text().trim());
        });

        // תת־סכום לכל מוצר
        cy.get(".cart_item .product-subtotal").each(($el) => {
            subtotals.push($el.text().trim());
        });

        // סה״כ עגלה
        cy.get(".order-total .woocommerce-Price-amount").invoke("text").then((total) => {

            // שימוש ב־UTILS
            writeCartToExcel(
                "cypress/results/cart.xlsx",
                productNames,
                quantities,
                prices,
                subtotals,
                total.trim()
            );

            cy.log("Excel file created!");
        });

    });

});
