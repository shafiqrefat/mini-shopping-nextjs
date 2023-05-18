import { getCartTotal } from "@/features/products/productsSlice";
import { HomeIcon } from "@heroicons/react/20/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { items, quantity, value } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [items]);
  return (
    <header className="flex justify-center items-center fixed top-0 shadow-md w-full py-3 bg-white z-50">
      <div>
        <ul className="flex gap-x-5 text-2xl">
          <li>
            <Link href="/" className="inline-flex items-center">
              <HomeIcon className="h-5 w-5 mr-1" /> Home
            </Link>
          </li>
        </ul>
      </div>
      <div className="ml-4 flow-root lg:ml-8">
        <Link href="/cart" className="group -m-2 flex items-center p-2">
          <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
          <span className="ml-2 text-2xl font-medium text-gray-700 group-hover:text-gray-800">
            {quantity}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
