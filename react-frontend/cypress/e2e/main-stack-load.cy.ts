describe('Keystone loads', () => {
    it('passes', () => {
        cy.visit('http://localhost:3000')
    })
})

describe('Node loads', () => {
    it('passes', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/getWoocommerceAttributeList',
        }).then((response) => {
            expect(response).property('status').to.equal(200)

            const body = (response.body)
            expect(body).to.not.be.null
            expect(body).to.be.a('array')
        })
    })
})

describe('React frontend loads', () => {
    it('passes', () => {
        cy.visit('http://localhost:3001')
    })
})