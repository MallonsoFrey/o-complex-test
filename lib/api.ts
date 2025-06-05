export interface Review {
  id: number;
  text: string;
}

export async function fetchReviews(): Promise<Review[]> {
  const res = await fetch("http://o-complex.com:1337/reviews");

  if (!res.ok) throw new Error("Ошибка при загрузке отзывов");

  return res.json();
}

export interface Item {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

export interface Items {
  page: number;
  amount: number;
  total: number;
  items: Item[];
}

export async function fetchItems(): Promise<Items> {
  const res = await fetch(
    "http://o-complex.com:1337/products?page=1&page_size=20"
  );

  if (!res.ok) throw new Error("Ошибка при загрузке товаров");

  return res.json();
}
