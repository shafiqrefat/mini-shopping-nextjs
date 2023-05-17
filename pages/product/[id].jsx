import Layout from "@/components/layouts/layout";
import { addToCart } from "@/features/products/productsSlice";
import {
  CalculatorIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const ProductInfo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const fetchProduct = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();
    return product;
  };
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery(["product"], fetchProduct);

  return (
    <Layout>
      {isLoading ? (
        <p className="flex justify-center items-center h-screen animate-pulse text-3xl">
          Loading<span className="animate-bounce ml-2">...</span>
        </p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <div className="border border-gray-200 max-w-xs p-5 m-5 rounded-md shadow-md text-center">
          {/* {console.log(product)} */}
          <Image
            width={150}
            height={150}
            src={product.image}
            alt=""
            className="block mx-auto py-3 hover:scale-110 transition-all"
          />
          <h1 className="text-2xl">{product.title}</h1>
          <div className="flex justify-between items-center py-4">
            <h6 className="text-2xl font-medium">€{product.price}</h6>
            <button
              className="addToCart_btn"
              onClick={() => dispatch(addToCart(product))}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Add to cart
            </button>
          </div>
          <div className="flex justify-between items-center py-4">
            <h6 className="inline-flex items-center gap-x-1 font-bold">
              <StarIcon className="w-5 h-5 text-yellow-600" />
              {product.rating.rate}
            </h6>
            <h6 className="inline-flex items-center gap-x-1 font-semibold">
              <CalculatorIcon className="w-5 h-5 text-lime-600" />
              {product.rating.count}
            </h6>
          </div>
          <p className="text-md text-gray-800">{product.description}</p>
        </div>
      )}
    </Layout>
  );
};

export default ProductInfo;
