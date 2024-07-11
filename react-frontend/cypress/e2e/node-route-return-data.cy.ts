describe('Node can pull the woocommerce attributes', () => {
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

describe('Node can pull the woocommerce products', () => {
    it('passes', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8080/getWoocommerceProductList',
        }).then((response) => {
            expect(response).property('status').to.equal(200)

            const body = (response.body)
            expect(body).to.not.be.null
            expect(body).to.be.a('array')
        })
    })
})