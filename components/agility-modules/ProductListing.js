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
          <Button>Add to Cart</Button>
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
