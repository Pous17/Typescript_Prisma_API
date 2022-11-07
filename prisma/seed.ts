import { db } from "../src/config/db.server";

type Category = {
    name: string;
}

type Product = {
    name: string;
    price: number;
    description: string;
}

async function seed() {
    await Promise.all(
        getCategory().map((category) => {
            return db.category.create({
                data: {
                    name: category.name,
                },
            });
        }));
    const category = await db.category.findFirst({
        where: {
            name: "Blue",
        },
    });

    await Promise.all(
        getProducts().map((product) => {
            const { name, price, description } = product;
            return db.product.create({
                data: {
                    name,
                    price,
                    description,
                    categoryId: category!.id,
                },
            });
        }));
}

seed();

function getCategory(): Array<Category> {
    return [
        {
            name: "Blue",
        },
        {
            name: "Red",
        },
        {
            name: "Green",
        },
        {
            name: "White",
        },
        {
            name: "Black",
        }
    ]
}

function getProducts(): Array<Product> {
    return [
        {
            name: "Blue Flower",
            price: 20,
            description: "it's a blue flower",
        },
        {
            name: "Red Flower",
            price: 20,
            description: "it's a black flower",
        },
        {
            name: "Black flower",
            price: 30,
            description: "it's a black flower",
        }
    ]
}