import LoginPresentation from "@root/presentation/login/index";

describe("Component LoginPresentation", () => {
    it("Check Component LoginPresentation: Check render forms", () => {
        cy.mount(<LoginPresentation />)
        cy.get('button#create-page-button').click()
        cy.get('form#form-create')
        cy.get('button#login-page-button').click()
        cy.get('form#form-login')
    })
})
