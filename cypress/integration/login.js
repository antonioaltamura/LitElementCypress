context("MyApp", () => {
    it("login", () => {
        cy.visit("http://localhost:3000/#login")

        cy.get("#home-nav").click()
        cy.url().should("include", "#home")
        cy.get("#page-title").contains( "home")

        cy.wait(1000);

        cy.get("#browser-nav").click()
        cy.url().should("include", "#browser")
        cy.get("#page-title").contains( "browser")

    })
})
