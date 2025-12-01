describe("Dynamic Content Test", () => {

    it("changes layout and takes screenshots", () => {

        cy.visit("https://www.bodyshop.co.il/products/");

        cy.screenshot("beforeChange");

        cy.get(".shop-view.per-row-2").click();

        cy.get(".shop-view.per-row-2").should("have.class", "current-variation");

        cy.screenshot("afterChange");
    });

});
