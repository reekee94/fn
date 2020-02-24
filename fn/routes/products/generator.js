const express = require('express');
const Chance = require('chance');
const chance = new Chance();

const Products = require('../../models/Product');
const Catalogs = require('../../models/Catalog');
const Categories = require('../../models/Category');
const Brands = require('../../models/Brand');
const Colors = require('../../models/Color');



const router = express.Router();

let sizeShoes1 = chance.pick(
    ['36', '37', '38'],
    1
    );
let sizeShoes2 = chance.pick(
    ['39', '40', '41'],
    1
);
let sizeShoes3 = chance.pick(
    ['42', '43', '44', '45'],
    1
);
let sizeWear1 = chance.pick(
    ['XS', 'S'],
    1
    );
let sizeWear2 = chance.pick(
    [ 'L','M'],
    1
);
let sizeWear3 = chance.pick(
    [ 'XL', 'XXL'],
    1
);

router.post('/', async (req, res) => {
    try {
        setInterval(async() => {
            const requestedCatalog = { catalog: chance.pick(["men", "women", "kids"], 1) };
            console.log(requestedCatalog);
            const catalog = await Catalogs.findOne(requestedCatalog);
            if (!catalog) throw { message: 'Bad catalog name' };

            const requestedCategory = {
                category: chance.pick(['dresses', 'sweaters', 'jeans', 't-shirts', 'shoes', 'hoodies', 'shirts'], 1),
            };
            let category = await Categories.findOne(requestedCategory);
            if (!category) {
                category = new Categories({
                    category: requestedCategory.category,
                });
                category = await category.save();
                catalog.categories.push(category);
                await catalog.save();
            }

            const condition = catalog.categories.findIndex(valueId => valueId.toString() === category.id);

            if (condition < 0) {
                catalog.categories.push(category);
                await catalog.save();
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

            const requestedColor ={ color: chance.pick(['red', 'black', 'blue', 'white', 'green', 'yellow'], 1) } ;
            let color = await Colors.findOne(requestedColor);
            if (!color) {
                color = new Colors({
                    color: requestedColor.color,
                });
                color = await color.save();
            }
            let mrspR = chance.integer({ min: 100, max: 1000 });
            let priceR = parseInt(mrspR * chance.pick([0.8, 0.6, 0.7, 0.9], 1));

            const props = [{
                size: (requestedCategory.category === 'shoes') ? sizeShoes1 : sizeWear1,
                available: chance.integer({ min: 1, max: 10 }),
                sku: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
                mrsp: mrspR,
                price: priceR

            },{
                size: (requestedCategory.category === 'shoes') ? sizeShoes2 : sizeWear2,
                available: chance.integer({ min: 1, max: 10 }),
                sku: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
                mrsp: mrspR,
                price: priceR
            }, {
                size: (requestedCategory.category === 'shoes') ? sizeShoes3 : sizeWear3,
                available: chance.integer({ min: 1, max: 10 }),
                sku: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
                mrsp: mrspR,
                price: priceR
            }];
            console.log(props);

            let gentitle = `${requestedCategory.category} ${requestedBrand.brand} ${chance.sentence({ words: 3 }).toLowerCase()}`;
            const product = new Products({
                catalog,
                category,
                brand,
                title: gentitle,
                description: chance.paragraph(),
                color,
                images: [],
                propetries: props,
            });

            if (product.category.category === 'dresses' && product.catalog.catalog === 'men') {product.category.category = 'hoodies'}

            if (product.catalog.catalog === 'women') {
                product.images = [`${product.category.category}_${product.catalog.catalog}.jpg`]
            } else if (product.catalog.catalog === 'men') {
                product.images = [`${product.category.category}_${product.catalog.catalog}.jpg`]
            } else {
                product.images = [`${product.category.category}_${product.catalog.catalog}.jpg`]
            }

            const newProduct = await product.save();
            res.status(201).send(newProduct);
        }, 1000)
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;


