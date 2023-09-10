import Alerts from "@root/presentation/login/components/Form/FormCreate/Alerts";
import FormComponent from "@root/presentation/login/components/Form/FormCreate/Form";

describe("Component: FormCreate", () => {
    it('Check Component Alert: Error Email exists', () => {
        cy.mount(<Alerts emailExists={true} error={null} success={false} />)
        cy.contains("E-mail já está sendo usado por outra conta.")
    })

    it('Check Component Alert: Error in request', () => {
        cy.mount(<Alerts emailExists={false} error={true} success={false} />)
        cy.contains("Erro ao efetuar cadastro, por favor tente outra hora!")
    })

    it('Check Component Alert: Success', () => {
        cy.mount(<Alerts emailExists={false} error={null} success={true} />)
        cy.contains("Sucesso! Seu cadastro foi efetuado com sucesso.")
    })

    it('Check Component Form: Return value submit', () => {
        cy.mount(<FormComponent
            checkEmailIsLoading={false}
            createUser={console.log}
            responseCheckEmail={null}
            response={null}
            onSubmit={(data) => {
                console.log(JSON.stringify(data))
            }}
            isLoading={false}
        />)

        cy.get("input#name").type("Goku")
        cy.get("input#email").type('goku.sayajin@gmail.com')
        cy.get("input#password").type('admin123')
        cy.get('form#form-create').submit()

        cy.log('{"email": "goku.sayajin@gmail.com", "name": "Goku", "password": "admin123"}')
    })

    it('Check Component Form: Return value to create user', () => {
        cy.mount(<FormComponent
            checkEmailIsLoading={false}
            createUser={() => {
                console.log({"email": "goku.sayajin@gmail.com", "name": "Goku", "password": "admin123"})
            }}
            responseCheckEmail={{
                status: 200,
                exist: false
            }}
            response={null}
            onSubmit={(_) => {}}
            isLoading={false}
        />)

        cy.log('{"email": "goku.sayajin@gmail.com", "name": "Goku", "password": "admin123"}')
    })

    it('Check Component Form: Validate e-mail format', () => {
        cy.mount(<FormComponent
            checkEmailIsLoading={false}
            createUser={console.log}
            responseCheckEmail={null}
            response={null}
            onSubmit={console.log}
            isLoading={false}
        />)

        cy.get("input#name").type("Goku")
        cy.get("input#email").type('goku.sayajin@')
        cy.get("input#password").type('admin123')

        cy.get("form#form-create button[disabled]")
    })

})
