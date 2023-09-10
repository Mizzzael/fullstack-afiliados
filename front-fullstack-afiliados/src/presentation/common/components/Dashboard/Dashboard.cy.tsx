import Header from "@root/presentation/common/components/Dashboard/Header";
import {useMeResponse} from "@root/services/User.service";
import FormComponent from "@root/presentation/common/components/Dashboard/Form";

describe("Component: Dashboard", () => {
    it ("Check Component Header: Render infos", () => {
        const response: useMeResponse = {
            email: "teste@gmail.com",
            name: "Teste",
            message: ".",
            status: 200,
        }
        const TOGGLE_CLICK_MESSAGE = 'Toggle has click;'
        const LOGGOUT_CLICK_MESSAGE = 'Logout has click;'
        cy.mount(
            <Header
                isLoading={false}
                response={response}
                toggleModal={() => {
                    console.log(TOGGLE_CLICK_MESSAGE);
                }}
                loggout={() => {
                    console.log(LOGGOUT_CLICK_MESSAGE);
                }}
            />
        )

        cy.contains(response.name)
        cy.get('button').contains('Logout').click()
        cy.log(LOGGOUT_CLICK_MESSAGE)
        cy.get('button').contains('Perfil').click()
        cy.log(LOGGOUT_CLICK_MESSAGE)
    })

    const TOGGLE_CLICK_MESSAGE = 'Toggle has click;'
    const response: useMeResponse = {
        name: "Teste",
        email: "teste@gmail.com",
        status: 200,
        message: '.'
    }

    it("Check Component Form: Check Event submit", () => {
        cy.mount(
            <FormComponent
                onSubmit={(data) => {
                    console.log(JSON.stringify(data))
                }}
                responseCheckEmail={{
                    status: 200,
                    exist: false,
                }}
                loadingPut={false}
                toggleModal={() => {
                    console.log(TOGGLE_CLICK_MESSAGE)
                }}
                updateUserHandle={(data) => {
                    console.log(JSON.stringify(data))
                }}
                response={response}
            />
        )

        cy.get('form').submit()
        cy.log('{"email": "teste@gmail.com", "name": "Teste"}')
        cy.get('button').contains("Cancelar").click()
        cy.log(TOGGLE_CLICK_MESSAGE)
    })

    it("Check Component Form: Check if email exist alert", () => {
        cy.mount(
            <FormComponent
                onSubmit={(data) => {
                    console.log(JSON.stringify(data))
                }}
                responseCheckEmail={{
                    status: 200,
                    exist: true,
                }}
                loadingPut={false}
                toggleModal={() => {
                    console.log(TOGGLE_CLICK_MESSAGE)
                }}
                updateUserHandle={(data) => {}}
                response={response}
            />
        )

        cy.contains("Este e-mail já está sendo usado por outro usuário!")
    })

    it("Check Component Form: Check if updateUserHandle was called", () => {
        cy.mount(
            <FormComponent
                onSubmit={(data) => {}}
                responseCheckEmail={{
                    status: 200,
                    exist: false,
                }}
                loadingPut={false}
                toggleModal={() => {
                    console.log(TOGGLE_CLICK_MESSAGE)
                }}
                updateUserHandle={(data) => {
                    console.log(JSON.stringify(data))
                }}
                response={response}
            />
        )

        cy.log('{"email": "teste@gmail.com", "name": "Teste"}')
    })
})
