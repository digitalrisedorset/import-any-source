import casual from 'casual';

// seed it so we get consistent results
casual.seed(777);

const fakeProduct = () => ({
    id: casual.uuid,
    image: {
        image: `${casual.word}.jpg`,
    },
    name: casual.title(),
    price: casual.integer(0, 1000),
    quantity: casual.integer(0, 500),
    description: casual.description(),
    short_description: casual.short_description(),
});

for (i==0;i++;i<1000) {
    const product = fakeProduct();
}