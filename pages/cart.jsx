import Layout from "@/components/layouts/layout";
import {
  decrementItem,
  getCartTotal,
  incrementItem,
  removeItem,
} from "@/features/products/productsSlice";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { MinusIcon } from "@heroicons/react/24/outline";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import emptyCartImage from "@/components/images/empty_cart.png";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const Cart = () => {
  const { items, quantity, value } = useSelector((state) => state.products);
  // console.log(items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [items]);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    //backend session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) alert(result.error.message);
  };
  return (
    <Layout>
      <div className="">
        <h1 className="text-3xl text-center py-5 font-bold tracking-tight text-gray-900 sm:text-4xl mt-14">
          Shopping Cart
        </h1>
        {items?.length == 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 md:mt-10">
            <Image
              src={emptyCartImage}
              alt="your cart is empty"
              width={450}
              height={450}
              className="animate-pulse"
            />
            <h1 className="text-3xl font-bold">Your cart is empty!!!</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 md:px-10">
              {items.map((item) => (
                <div
                  className="border border-gray-300 p-2 m-2 shadow-md text-center md:text-start"
                  key={item.id}
                >
                  <div className="">
                    <Image
                      width={150}
                      height={150}
                      src={item.image}
                      alt=""
                      className="block mx-auto hover:scale-110 py-2 transition-all h-[150px] w-[150px]"
                    />
                    <h1 className="text-xl font-semibold py-2">{item.title}</h1>
                  </div>
                  <div>
                    <h6 className="mt-2 text-xl font-bold">€ {item.price}</h6>
                    <div className="flex gap-x-2 py-2 justify-center md:justify-start">
                      <div>
                        {item.quantity == 1 && (
                          <MinusIcon
                            className="w-5 h-5 border border-gray-400 rounded-md"
                            onClick={() => dispatch(removeItem(item.id))}
                          />
                        )}
                        {item.quantity > 1 && (
                          <MinusIcon
                            className="w-5 h-5 border border-gray-400 rounded-md"
                            onClick={() => dispatch(decrementItem(item.id))}
                          />
                        )}
                      </div>

                      <h4>{item.quantity}</h4>
                      <PlusIcon
                        className="w-5 h-5 border border-gray-400 rounded-md"
                        onClick={() => dispatch(incrementItem(item.id))}
                      />
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center gap-x-2"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove <TrashIcon className="w-5 h-5 text-red-700" />
                  </span>
                </div>
              ))}
            </div>
            <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8">
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">
                    Total Quantity
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {quantity}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pt-4"></div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Total Price</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    € {value}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  onClick={createCheckoutSession}
                >
                  Checkout
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
