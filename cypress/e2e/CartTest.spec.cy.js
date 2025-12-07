import { writeCartToExcel } from "../support/utils";

describe("Cart Test", () => {

    it("add 3 items and verify cart + export to excel", () => {

        cy.visit("https://www.bodyshop.co.il/");

        cy.get("#menu-item-210208 > a").click();
        cy.get("h3.wd-entities-title a[href*='white-musk-perfume-oil']").click();
        cy.get("button.single_add_to_cart_button").click();

        cy.get("#menu-item-209983 > a").click();
        cy.get("a.product-image-link[href*='hand-cream-men']").click();
        cy.get("button.single_add_to_cart_button").click();

        cy.get("#menu-item-209992 > a").click();
        cy.get("div[data-id='1388']").click();
        cy.get("button.single_add_to_cart_button").click();

        cy.get(".woocommerce-mini-cart-item .quantity .plus").click().click();

        cy.visit("https://www.bodyshop.co.il/cart/");

        const productNames = [];
        const quantities = [];
        const prices = [];
        const subtotals = [];

        cy.get(".cart_item .product-name").each(($el) => {
            productNames.push($el.text().trim());
        });

        cy.get(".cart_item .product-quantity input.qty").each(($el) => {
            quantities.push(Number($el.val()));
        });

        cy.get(".cart_item .product-price").each(($el) => {
            prices.push($el.text().trim());
        });

        cy.get(".cart_item .product-subtotal").each(($el) => {
            subtotals.push($el.text().trim());
        });

        cy.get(".order-total .woocommerce-Price-amount").invoke("text").then((total) => {

          
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
