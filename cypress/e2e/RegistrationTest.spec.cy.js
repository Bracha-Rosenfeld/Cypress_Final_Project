

describe("Registration Tests", () => {

    const url = "https://www.bodyshop.co.il/%D7%94%D7%A6%D7%98%D7%A8%D7%A4%D7%95%D7%AA-%D7%9C%D7%9E%D7%95%D7%A2%D7%93%D7%95%D7%9F/";

    function safeClick(selector) {
        cy.get(selector).then($el => {
            if ($el.is(':visible') && !$el.is(':disabled')) {
                cy.wrap($el).click({ force: true });
            } else {
                cy.wrap($el).scrollIntoView().click({ force: true });
            }
        });
    }

    function isErrorDisplayed() {
        return cy.get("div.elementor-message.elementor-message-danger[role='alert']")
                 .then($el => $el.length > 0);
    }

    it("invalid email", () => {
        cy.visit(url);
        cy.get("#form-field-name").type("John");
        cy.get("#form-field-field_60edae3").type("Doe");
        safeClick("#form-field-field_579f0e8-0"); // male
        cy.get("#form-field-field_f19d3d6").type("john@g"); // Invalid email
        cy.get("#form-field-email").type("0500000000");
        cy.get("#form-field-field_883df88").type("Some Street");
        cy.get("#form-field-field_5a281aa").type("Jerusalem");
        safeClick("#form-field-field_801783e");
        safeClick("#form-field-field_2e50be6");

        cy.get(".elementor-button.elementor-size-sm").first().click({ force: true });

        isErrorDisplayed().should("be.true");
    });

    it("invalid phone", () => {
        cy.visit(url);
        cy.get("#form-field-name").type("John");
        cy.get("#form-field-field_60edae3").type("Doe");
        safeClick("#form-field-field_579f0e8-0"); // male
        cy.get("#form-field-field_f19d3d6").type("john@gmail.com");
        cy.get("#form-field-email").type("abc"); // Invalid phone
        cy.get("#form-field-field_883df88").type("Some Street");
        cy.get("#form-field-field_5a281aa").type("Jerusalem");
        safeClick("#form-field-field_801783e");
        safeClick("#form-field-field_2e50be6");

        cy.get(".elementor-button.elementor-size-sm").first().click({ force: true });

        isErrorDisplayed().should("be.true");
    });

    it("invalid city", () => {
        cy.visit(url);
        cy.get("#form-field-name").type("John");
        cy.get("#form-field-field_60edae3").type("Doe");
        safeClick("#form-field-field_579f0e8-0"); // male
        cy.get("#form-field-field_f19d3d6").type("john@gmail.com");
        cy.get("#form-field-email").type("0500000000");
        cy.get("#form-field-field_883df88").type("Some Street");
        cy.get("#form-field-field_5a281aa").type("123"); // Invalid city
        safeClick("#form-field-field_801783e");
        safeClick("#form-field-field_2e50be6");

        cy.get(".elementor-button.elementor-size-sm").first().click({ force: true });

        isErrorDisplayed().should("be.true");
    });

    it("valid form", () => {
        cy.visit(url);
        cy.get("#form-field-name").type("John");
        cy.get("#form-field-field_60edae3").type("Doe");
        safeClick("#form-field-field_579f0e8-0"); // male
        cy.get("#form-field-field_f19d3d6").type("john@gmail.com");
        cy.get("#form-field-email").type("0500000000");
        cy.get("#form-field-field_883df88").type("Some Street");
        cy.get("#form-field-field_5a281aa").type("Jerusalem");
        safeClick("#form-field-field_801783e");
        safeClick("#form-field-field_2e50be6");

        cy.get(".elementor-button.elementor-size-sm").should("be.enabled");
    });

});
