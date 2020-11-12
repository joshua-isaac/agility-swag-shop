import React from "react";
import tw from "twin.macro";

const Container = tw.div`max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3`;
const Card = tw.div``;
const Title = tw.h1`text-xl font-bold`;
const Price = tw.p`text-sm mb-2 text-primary-600`;

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
      const description = product.fields.description;
      const image = product.fields.image.url;
      const price = product.fields.price;

      return {
        title,
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
