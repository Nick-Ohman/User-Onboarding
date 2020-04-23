describe("Test our inputs and submit our form", function ()
{
    beforeEach(function () {
        cy.visit('http://localhost:3000');
    });
    it('Add test to inputs and submit form', function () {
        cy.get('input[name="name"]')
            .type("nick")
            .should("have.value", "nick");
        cy.get('input[name="email"]')
            .type("nick.ohman@gmail.com")
            .should("have.value", "nick.ohman@gmail.com")
        cy.get('input[name="password"]')
            .type('thanks')
            .should("have.value", "thanks")
        cy.get('[type="checkbox"]').check()
            .should('be.checked')
        cy.get('button').click();
            
    });  
});
