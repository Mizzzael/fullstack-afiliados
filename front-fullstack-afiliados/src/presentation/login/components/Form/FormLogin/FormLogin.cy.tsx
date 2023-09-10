import AlertComponent from "@root/presentation/login/components/Form/FormLogin/Alert";
import FormComponent from "@root/presentation/login/components/Form/FormLogin/Form";

describe('Component: FormLogin', () => {
    const Error401 = {
        response: {
            status: 401
        }
    }

    const ErrorGeneric = {
        response: {
            status: 500
        }
    }

    it("Check Component Alert: Error 401", () => {
        cy.mount(<AlertComponent error={Error401} />)
        cy.get('div').contains('Usuário ou senha incorretos!')
    });

    it("Check Component Alert: Error Generic", () => {
        cy.mount(<AlertComponent error={ErrorGeneric} />)
        cy.get('div').contains('Ops! Tivemos um erro interno, por favor tente mais tarde.')
    });

    it("Check Component Form: Return value submit", () => {
        cy.mount(<FormComponent onSubmit={(data) => {
            console.log(JSON.stringify(data))
        }} isLoading={false} />)

        cy.get("input#email").type("teste@gmail.com")
        cy.get("input#password").type("admin123")
        cy.get("form#form-login").submit()

        cy.log("{email: 'teste@gmail.com', password: 'admin123'}")
    })

    it("Check Component Form: Validate e-mail format", () => {
        cy.mount(<FormComponent onSubmit={(data) => {
            console.log(JSON.stringify(data))
        }} isLoading={false} />)

        cy.get("input#email").type("teste@gmail")
        cy.get("input#password").type("admin123")
        cy.get("form#form-login button[disabled]")
    })
})
