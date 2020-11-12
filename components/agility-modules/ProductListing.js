import React from "react";
import tw from "twin.macro";

const Container = tw.div`container mx-auto grid gap-5 grid-cols-1 sm:grid-cols-3 mb-8`;
const Card = tw.div`my-8`;
const Title = tw.h1`mt-2 text-xl font-bold`;
const Price = tw.p`text-sm mb-2 text-primary-600 font-bold`;
const Button = tw.button`bg-primary-600 text-white w-full p-2 font-bold mt-2`;

const ProductListing = ({ customData, fields, page }) => {
  const { products } = customData;
  return (
    <Container>
      {products.map((product, i) => (
        <Card>
          <img src={product.image} />
          <Title>{product.title}</Title>
          <Price>${product.price}</Price>
          <p>{product.description}</p>
          <Button
            className="snipcart-add-item"
            data-item-id={product.id}
            data-item-price={product.price}
            data-item-url="/api/products"
            data-item-description={product.description}
            data-item-image={product.image}
            data-item-name={product.title}
          >
            Add to Cart
          </Button>
        </Card>
      ))}
    </Container>
  );
};

ProductListing.getCustomInitialProps = async function ({
  agility,
  channelName,
  languageCode,
}) {
  const api = agility;

  try {
    const rawProducts = await api.getContentList({
      referenceName: "products",
      languageCode,
    });

    const products = rawProducts.map((product) => {
      const title = product.fields.title;
      const id = product.fields.title.replace(/\s+/g, "-").toLowerCase();
      const description = product.fields.description;
      const image = product.fields.image.url;
      const price = product.fields.price;

      return {
        title,
        id,
        description,
        image,
        price,
      };
    });

    return {
      products,
    };
  } catch (error) {
    if (console) console.error(error);
  }
};

export default ProductListing;
