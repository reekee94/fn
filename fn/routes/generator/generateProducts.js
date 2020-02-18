const Chance = require('chance');
const chance = new Chance();
const express = require('express');
const Products = require('../../models/Product');
const ProductPropetries = require('../../models/ProductPropetries');


const { Catalogs, Categories, Brands, Colors } = ProductPropetries;

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        //setInterval(async() => {
            const requestedCatalog = { catalog: chance.pick(["men", "women", "kids"], 1) };
            const catalog = await Catalogs.findOne(requestedCatalog);
            if (!catalog) throw { message: 'Bad catalog name' };

            const requestedCategory = {
                category: chance.pick(['dresses', 'sweaters', 'jeans', 't-shirts', 'shoes', 'hoodies'], 1),
            };
            let category = await Categories.findOne(requestedCategory);
            if (!category) {
                category = new Categories({
                    category: requestedCategory.category,
                });
                category = await category.save();
            }

            const requestedBrand = {
                brand: chance.pick(['zori', 'addic', 'hikee', 'ruma', 'cassics', 'tier', 'dive', 'tommy kesh', 'gosha', 'medicine'], 1),
            };
            let brand = await Brands.findOne(requestedBrand);
            if (!brand) {
                brand = new Brands({
                    brand: requestedBrand.brand,
                });
                brand = await brand.save();
            }

            const requestedColor = { color: chance.pick(['red', 'black', 'blue', 'white', 'green', 'yellow'], 1) };
            let color = await Colors.findOne(requestedColor);
            if (!color) {
                color = new Colors({
                    color: requestedColor.color,
                });
                color = await color.save();
            }
            const props = {
                size: chance.pick(
                    ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
                    1
                ),
                available: chance.integer({ min: 1, max: 20 }),
                sku: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
                mrsp: chance.integer({ min: 100, max: 1000 }),
                price: undefined,
            };
            props.price = parseInt(props.mrsp * chance.pick([0.6, 0.7, 0.8, 0.9], 1));
            const product = new Products({
                catalog,
                category,
                brand,
                title: undefined,
                description: chance.paragraph(),
                color,
                images: [],
                propetries: [props],
            });
            product.title = `${product.category.category} ${product.brand.brand} ${chance.sentence({ words: 3 }).toLocaleString()}`;
            product.images = `${product.catalog.catalog}_${product.category.category}.jpg`;
            if (product.catalog.catalog === 'men' && product.category.category === 'dresses'){product.category.category = 'hoodies'}
            const newProduct = await product.save();
            res.status(201).send(newProduct);
        //}, 10000)
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;
