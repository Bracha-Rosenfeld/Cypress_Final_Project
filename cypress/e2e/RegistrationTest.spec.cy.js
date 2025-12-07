describe("Registration Tests", () => {

    const url = "https://www.bodyshop.co.il/%D7%94%D7%A6%D7%98%D7%A8%D7%A4%D7%95%D7%AA-%D7%9C%D7%9E%D7%95%D7%A2%D7%93%D7%95%D7%9F/";

    it("invalid data 1", () => {

        cy.visit(url);
        cy.get("#form-field-name").type("Bracha");
        cy.get("#form-field-field_60edae3").type("Rose");
        cy.get("#form-field-field_579f0e8-1").click();
        cy.get("#form-field-email").type("05");
        cy.get("#form-field-field_f19d3d6").type("bracha@example.com");
        cy.get("#form-field-field_801783e").click({ force: true });
        cy.get("#form-field-field_2e50be6").click({ force: true });

        cy.get(".elementor-button.elementor-size-sm").should("not.be.enabled");
    });

    it("invalid data 2", () => {

        cy.visit(url);
        cy.get("#form-field-name").type("Bracha");
        cy.get("#form-field-field_60edae3").type("Rose");
        cy.get("#form-field-field_579f0e8-1").click();
        cy.get("#form-field-email").type("0500000000");
        cy.get("#form-field-field_f19d3d6").type("bracha@g.");
        cy.get("#form-field-field_801783e").click({ force: true });
        cy.get("#form-field-field_2e50be6").click({ force: true });

        cy.get(".elementor-button.elementor-size-sm").should("not.be.enabled");
    });

    it("valid form", () => {

        cy.visit(url);
        cy.get("#form-field-name").type("Bracha");
        cy.get("#form-field-field_60edae3").type("Rosenfeld");
        cy.get("#form-field-field_579f0e8-1").click();
        cy.get("#form-field-field_f19d3d6").type("bracha@gmail.com");
        cy.get("#form-field-email").type("0500000000");
        cy.get("#form-field-field_883df88").type("Some Street 1");
        cy.get("#form-field-field_5a281aa").type("Jerusalem");
        cy.get("#form-field-field_801783e").click({ force: true });
        cy.get("#form-field-field_2e50be6").click({ force: true });

        cy.get(".elementor-button.elementor-size-sm").should("be.enabled");
    });

});
