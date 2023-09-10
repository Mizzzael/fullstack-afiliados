import TransactionFileUploader from "@root/presentation/transaction/components/TransactionFileUploader/index";

describe("Component FileUploader", () => {
    it ("Check Component FilePreview: Check format file", () => {
        cy.mount(<TransactionFileUploader callback={console.log} />)
        cy.get("button#modal-uploader-trigger").click()
        cy.get("input#fileinput").selectFile({
            contents: Cypress.Buffer.from('12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS'),
            fileName: 'file.txt',
            lastModified: Date.now(),
        }, {
            force: true
        })
        cy.get("button").contains('Processar')
        cy.get("button").contains('Cancelar').click()

        cy.get("input#fileinput").selectFile({
            contents: Cypress.Buffer.from('{"author": "J.R.R. Token", "book": "Lord of the rings"}'),
            fileName: 'file.json',
            lastModified: Date.now(),
        }, {
            force: true
        })

        cy.contains("Somente arquivos .txt são permitidos.")
    })
})
