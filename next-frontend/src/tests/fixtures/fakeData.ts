import casual from 'casual';

// get consistent results
casual.seed(777);

export const fakeUser = (overrides) => ({
    __typename: 'User',
    id: 'abc123',
    name: casual.name,
    email: casual.email,
    role: {
        canCreateProducts: true,
        canUpdateProducts: true,
        canDeleteProducts: true,
        canImportSourceAttribute: true,
        canImportMagentoAttribute: true,
        canMapAttribute: true,
        canImportProduct: true
    },
    theme: 'Forest',
    ...overrides,
});