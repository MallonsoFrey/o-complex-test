import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, setItemQuantity } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { useState, useEffect } from "react";

interface IOrder {
  id: number;
  title: string;
  image_url: string;
  price: number;
  description: string;
}

export const ItemCard = ({
  id,
  image_url,
  title,
  description,
  price,
}: IOrder) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id)
  );

  const [inputValue, setInputValue] = useState<string>(
    cartItem?.quantity?.toString() || "1"
  );

  const handleChange = (value: string) => {
    setInputValue(value);

    const num = Number(value);

    if (value !== "" && num >= 1) {
      dispatch(setItemQuantity({ id, quantity: num }));
    }
  };

  useEffect(() => {
    if (cartItem?.quantity !== undefined) {
      setInputValue(cartItem.quantity.toString());
    }
  }, [cartItem?.quantity]);

  return (
    <div className="bg-[#D9D9D9] flex flex-col justify-between items-center gap-10 max-w-[300px] min-h-[500px] rounded-md p-4">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl">Товар: {id}</h2>
        <h3>{title}</h3>
        <img src={image_url} width={250} height={250} alt={title} />
        <p>{description}</p>
      </div>
      <h2 className="text-2xl">{price} рублей</h2>

      {!cartItem ? (
        <Button
          title="Купить"
          onClick={() => dispatch(addItem({ id, title, price, image_url }))}
        />
      ) : (
        <div className="flex items-end gap-2">
          <Button title="−" onClick={() => dispatch(removeItem(id))} />
          <input
            type="number"
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            className="w-12 text-center appearance-none text-2xl md:text-3xl p-1 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button
            title="+"
            onClick={() => dispatch(addItem({ id, title, price, image_url }))}
          />
        </div>
      )}
    </div>
  );
};
