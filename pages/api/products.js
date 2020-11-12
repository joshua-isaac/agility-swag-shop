import agility from "@agility/content-fetch";

// setup content fetch
const api = agility.getApi({
  guid: process.env.AGILITY_GUID,
  apiKey: process.env.AGILITY_API_FETCH_KEY,
});

// get products
const getProducts = async () => {
  const data = api
    .getContentList({
      referenceName: "products",
      languageCode: "en-us",
    })
    .then(function (contentList) {
      return contentList;
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
  return data;
};

export default async (req, res) => {
  const response = await getProducts();

  const products = response.items.map((product) => {
    return {
      title: product.fields.title,
      image: product.fields.image.url,
      price: product.fields.price,
      description: product.fields.description,
    };
  });

  return res.status(200).json(products);
};
