import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const Products = () => {
  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    return products;
  };
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery(["products"], fetchProducts);

  return (
    <div>
      <h1 className="text-center text-3xl md:text-5xl py-8 font-bold mt-10 md:mt-14">
        Welcome to Mini Shop
      </h1>
      {isLoading ? (
        <p className="flex justify-center items-start text-4xl animate-ping">
          Loading...
        </p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-4 py-4">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product?.id}>
              <div className="border border-gray-500 rounded-lg p-2 m-2 text-center shadow-md max-w-sm space-y-3">
                <Image
                  src={product.image}
                  width={150}
                  height={150}
                  alt="pdt-img"
                  className="block mx-auto hover:scale-110 transition-all h-[150px] w-[150px]"
                />
                <h1 className="text-xl font-normal text-gray-700 mt-auto truncate">
                  {product.title}
                </h1>
                <h1 className="text-3xl font-semibold">€{product.price}</h1>
                <h1 className="text-sm py-2">
                  <span className="text-white text-medium mr-2 rounded-full p-2 bg-gray-600">
                    Category:
                  </span>
                  {product.category}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
