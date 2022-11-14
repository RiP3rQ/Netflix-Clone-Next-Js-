import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
// import Membership from "../components/Membership";
import useAuth from "../hooks/useAuth";
import useSubscription from "../hooks/useSubscription";
import payments, { goToBillingPortal } from "../lib/stripe";

interface Props {
  products: Product[];
}

function Account({ products }: Props) {
  const { user, logout, loading } = useAuth();
  const subscription = useSubscription(user);
  const [isBillingLoading, setBillingLoading] = useState(false);

  return (
    <div>
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`bg-[#141414]`}>
        <Link href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
          <img
            src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img
              src="https://assets.nflxext.com/ffe/siteui/account/svg/membersince.svg"
              alt=""
              className="h-7 w-7"
            />
            <p className="text-xs font-semibold text-[#555]">
              Member since {subscription?.created}
            </p>
          </div>
        </div>

        {/* MEMBERSHIP COMPONENT */}
        {/* <Membership /> */}

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Plan Details</h4>
          {/* Find the current plan */}
          <div className="col-span-2 font-medium">
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p
            className="cursor-pointer text-blue-500 hover:underline md:text-right"
            // onClick={goToBillingPortal}
          >
            Change plan
          </p>
        </div>
      </main>
    </div>
  );
}

export default Account;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};
