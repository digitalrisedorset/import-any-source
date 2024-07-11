import { gql } from "@apollo/client";
import { client } from '../../src/nocors-client'

describe('Keystone can pull list the woocommerce attributes', () => {
    it('passes', () => {
        const query = gql`
            query { woocommerceAttributesCount }
        `

        cy.wrap(
            client.query({
                query,
                fetchPolicy: 'no-cache',
            }),
        )
            .its('data.woocommerceAttributesCount')
            .should('be.gte', 0)
    })
})


describe('Keystone can pull list the magento attributes', () => {
    it('passes', () => {
        const query = gql`
            query { magentoAttributesCount }
        `

        cy.wrap(
            client.query({
                query,
                fetchPolicy: 'no-cache',
            }),
        )
            .its('data.magentoAttributesCount')
            .should('be.gte', 0)
    })
})
