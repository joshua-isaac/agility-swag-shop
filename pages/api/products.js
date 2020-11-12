import axios from "axios";

const getProducts = async () => {
  const data = await axios.get(
    `https://${process.env.AGILITY_GUID}-api.agilitycms.cloud/fetch/en-us/list/products`,
    {
      headers: {
        "Content-Type": "application/json",
        apikey: `${process.env.AGILITY_API_FETCH_KEY}`,
      },
    }
  );
  return data;
};

export default async (req, res) => {
  const response = await getProducts();

  const products = response.data.items.map((product) => {
    // console.log(product)
    return {
      title: product.fields.title,
      id: product.fields.title.replace(/\s+/g, "-").toLowerCase(),
      price: product.fields.price,
      description: product.fields.description,
      image: product.fields.image.url,
    };
  });

  return res.status(200).json(products);
};
