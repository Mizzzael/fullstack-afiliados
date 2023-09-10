import List from "@root/presentation/transaction/components/TransactionsList/List";
import {result} from "@root/services/Transaction.service";
import formatDate from "@root/presentation/common/utils/formatDate";

describe("Component List", () => {
    const response: { result: result[], total: number, valueTotal: number  } = {
        result: [
            {
                id: 1,
                type: "tipo",
                product: 'product',
                seller: 'seller',
                value: 50,
                date: new Date().toUTCString(),
                active: true,
                created_at: new Date().toUTCString(),
                filetxtId: 1,
                userId: 1,
                update_at: new Date().toUTCString(),
                filetxt: {
                    active: true,
                    created_at: new Date().toUTCString(),
                    update_at: new Date().toUTCString(),
                    id: 1,
                    name: 'teste'
                }
            }
        ],
        valueTotal: 50,
        total: 1
    }
    it("Check Component List: List render table", () => {
        cy.mount(<List response={response} isLoading={false} />)
        cy.get(`tr#transaction-${ response.result[0].id }`)
        cy.get(`tr#transaction-${ response.result[0].id } td`).contains('tipo')
        cy.get(`tr#transaction-${ response.result[0].id } td`).contains('product')
        cy.get(`tr#transaction-${ response.result[0].id } td`).contains('seller')
        const { date } = response.result[0]
        cy.get(`tr#transaction-${ response.result[0].id } td`).contains('seller')
        cy.get(`tr#transaction-${ response.result[0].id } td`).contains(formatDate(date))
    })
})
