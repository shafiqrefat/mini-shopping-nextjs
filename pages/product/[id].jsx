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
        <div className="h-screen flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-2 border-dotted border-blue-900 animate-spin"></div>
        </div>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <div className="mx-auto border border-gray-200 max-w-xs p-5 m-5 rounded-md shadow-md hover:shadow-xl text-center hover:scale-105 transition-transform ease-out duration-200 mt-24 md:mt-20">
          {/* {console.log(product)} */}
          <Image
            width={150}
            height={150}
            src={product.image}
            alt=""
            className="block mx-auto"
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
          <p className="text-md text-gray-800">
            {product.description}
          </p>
        </div>
      )}
    </Layout>
  );
};

export default ProductInfo;
