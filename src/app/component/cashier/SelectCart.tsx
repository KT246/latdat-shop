"use client";
import { Button } from "@heroui/react";
import React from "react";

const SelectCart = () => {
  const [cart, setCart] = React.useState("");
  React.useEffect(() => {
    const cart = localStorage.getItem("cartname");
    if (cart) {
      setCart(cart);
    } else {
      localStorage.setItem("cartname", "1");
    }
  }, []);
  const handleCart = (cartname: string) => {
    setCart(cartname);
    localStorage.setItem("cartname", cartname);
  };
  return (
    <div className="mb-3 flex justify-start gap-3">
      <Button
        onPress={() => handleCart("1")}
        color={`${cart === "1" ? "primary" : "default"}`}
      >
        ກະຕ່າ 1
      </Button>
      <Button
        onPress={() => handleCart("2")}
        color={`${cart === "2" ? "primary" : "default"}`}
      >
        ກະຕ່າ 2
      </Button>
      <Button
        onPress={() => handleCart("3")}
        color={`${cart === "3" ? "primary" : "default"}`}
      >
        ກະຕ່າ 3
      </Button>
    </div>
  );
};

export default SelectCart;
