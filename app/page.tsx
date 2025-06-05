import { ReviewCard } from "@/components/ReviewCard";
//import { OrderCard } from "@/components/OrderList/OrderCard";
import { fetchReviews } from "@/lib/api";
import { ProductList } from "@/components/ProductList/ProductList";
import dynamic from "next/dynamic";

const OrderCard = dynamic(() =>
  import("@/components/OrderList/OrderCard").then((mod) => mod.OrderCard)
);

export default async function Home() {
  const reviews = await fetchReviews();

  return (
    <div className="w-full flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[#222222]">
      <header className="w-[90%] bg-[#777777] text-center">
        <h1 className="text-3xl md:text-8xl py-2 text-[#fff]">PROJECT</h1>
      </header>
      <main className="w-full mx-auto mt-8 flex flex-col justify-center items-center gap-[32px] max-w-[70%]">
        <section className="flex flex-col sm:flex-row flex-wrap gap-4 w-full items-center">
          {reviews.map((review) => {
            return (
              <ReviewCard key={review.id} id={review.id} text={review.text} />
            );
          })}
        </section>
        <OrderCard />
        <ProductList />
      </main>
    </div>
  );
}
