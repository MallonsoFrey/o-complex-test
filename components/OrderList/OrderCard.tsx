"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setPhone } from "@/store/cartSlice";
import { PhoneInput } from "./PhoneInput";
import { Button } from "../Button";
import { useState } from "react";

export const OrderCard = () => {
  const { items, phone } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const isValidPhone = phone.replace(/\D/g, "").length === 11;

  const handleSubmit = async () => {
    if (!isValidPhone) {
      setError(true);
      return;
    }

    setError(false);

    try {
      const response = await fetch("http://o-complex.com:1337/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone.replace(/\D/g, ""),
          cart: items.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Ошибка отправки:", err);
    }
  };

  return (
    <div className="bg-[#D9D9D9] justify-between rounded-md p-4 flex flex-col gap-4 md:min-w-[400px] md:min-h-[300px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Добавленные товары</h2>
        {items.map((item) => (
          <div key={item.id}>
            {item.title} × {item.quantity}
          </div>
        ))}
        <p>Итого: {total} ₽</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-stretch">
        <PhoneInput
          className={`border ${
            error ? "border-red-500 bg-red-100 text-black" : "text-white"
          }`}
          value={phone}
          onChange={(val) => dispatch(setPhone(val))}
        />
        <Button
          className="w-full sm:w-auto sm:self-end"
          title="Заказать"
          onClick={handleSubmit}
        />
      </div>
      {success && (
        <div className="bg-green-200 text-green-800 p-2 rounded text-center animate-fade-in-out">
          Заказ успешно отправлен!
        </div>
      )}
    </div>
  );
};
