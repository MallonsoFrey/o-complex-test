"use client";

import { useEffect, useRef, useState } from "react";
import { fetchItems, Item } from "@/lib/api";
import { ItemCard } from "./ItemCard";

const ITEMS_PER_PAGE = 6;

export const ProductList = () => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchItems();
        setAllItems(data.items);
      } catch (err) {
        console.error("Ошибка при загрузке товаров:", err);
      }
    };
    load();
  }, []);

  const visibleItems = allItems.slice(0, visibleCount);
  const hasMore = visibleCount < allItems.length;

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
        }
      },
      {
        rootMargin: "100px",
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore]);

  return (
    <div>
      <section className="flex flex-col sm:flex-row flex-wrap gap-4 w-full items-center sm:items-start">
        {visibleItems.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            image_url={item.image_url}
            title={item.title}
            description={item.description}
            price={item.price}
          />
        ))}
      </section>

      {hasMore && <div ref={loaderRef} className="h-10 w-full" />}
    </div>
  );
};
