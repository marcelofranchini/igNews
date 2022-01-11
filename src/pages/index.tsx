import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import SubscribeButton from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "./home.module.scss";

interface HomeProps {
  product: {
    productId: string;
    amount: number;
  };
}
const Home = ({ product }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.homeContainer}>
        <section className={styles.hero}>
          <span>
            👏 <strong>Hey, welcome</strong>
          </span>
          <h1>
            News about the <span>React </span>world
          </h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.productId} />
        </section>
        <img src="/images/avatar.svg" alt="avatar" />
      </main>
    </>
  );
};

export default Home;

// client-side (no browser sem index, comentários)
//Server-side(indexação e dinamico)
//static site generation (vai recarregar somente o revalidade, post blog)

//Conteudo (ssg)
//comentarios (client-side)
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1K9Ev8G8EmtpK0rPEUppDADD", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 hours
  };
};
