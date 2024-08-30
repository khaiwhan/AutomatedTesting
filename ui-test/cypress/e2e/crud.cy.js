/// <reference types="cypress" />

describe("Visit Web", () => {
    beforeEach(() => {
        cy.visit("https://angular-nes-css.vercel.app/")
    })

    it("display web angular nes css", () => {
        cy.title().should('eq', 'AngularNesCss')
    })

    it("add new item", () => {
        cy.contains('button.nes-btn.is-primary.is-large', 'Add').click()

        cy.title().should("eq", "Detail")
        const code = cy.get('input[formControlName=code]')
        const codeExist = code.should('exist')
        const description = cy.get('textarea[formControlName=description]')
        const descriptionExist = description.should('exist')
        const active = cy.get("input[formControlName=active]")
        const activeExist = active.should("exist")
        const saveBtn = cy.contains('button.nes-btn.is-primary', "Save")
        saveBtn.should("exist")

        if (codeExist) {
            cy.fixture("datasource.json").then((data) => {
                code.type(data.code)
            })
        }

        if (descriptionExist) {
            cy.fixture("datasource.json").then((data) => {
                description.type(data.description)
            })
        }

        if (activeExist) {
            cy.fixture("datasource.json").then((data) => {
                if (data.active) active.check({ force: true })
                else active.uncheck({ force: true })
            })
        }

        saveBtn.click().then(() => {
            cy.wait(1000)
        })
    })

    it("edit item", () => {
        cy.fixture("datasource.json").then((data) => {
            cy.get('table tbody tr').contains('td', data.code).click()
            cy.get('textarea[formControlName=description]').should("exist").clear().type("description edit")
            cy.get("input[formControlName=active]").should("exist").uncheck({ force: true })

        }).then(() => {
            cy.contains('button.nes-btn.is-primary', "Save").should("exist").click().then(() => {
                cy.wait(1000)
            })
        })
    })

    it("delete item", () => {
        cy.fixture("datasource.json").then((data) => {
            cy.get('table tbody tr').contains('td', data.code).parent().contains("button.nes-btn.is-error", "Delete").should("exist").click().wait(1000)
        })
    })
})