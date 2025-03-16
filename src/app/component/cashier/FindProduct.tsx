"use client";
import { useCart } from "@/app/lib/cartRetailContext";
import { Input } from "@heroui/react";
import axios from "axios";
import React from "react";
import Highlighter from "react-highlight-words";

const FindProduct = () => {
  const { cart, addProduct } = useCart();
  const [search_type, setSaerchType] = React.useState("");
  const [key, setKey] = React.useState("");
  const [barcode, setBarcode] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [productsTemp, setProductsTemp] = React.useState<any>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    console.log(cart);
  }, [cart]);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const search_type = localStorage.getItem("search_type");
        if (search_type !== null) {
          setSaerchType(search_type);
        } else {
          localStorage.setItem("search_type", "code");
        }
      } catch (error) {
        throw error;
      }
    }
  }, []);

  React.useEffect(() => {
    if (key.length > 0) {
      if (search_type === "code") {
        FindProductByCode();
      }
      if (search_type === "title") {
        FindProductByTitle();
      }
      if (search_type === "page") {
        FindProductByPage();
      }
      if (search_type === "No") {
        FindProductByNo();
      }
    } else {
      setProductsTemp([]);
    }
  }, [key]);

  const PlaySound = () => {
    const audio = new Audio("/sound/wrong.mp3");
    audio.play();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (barcode !== "") {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_API_URL +
            "/api/cashier/findretail?barcode=" +
            barcode
        );
        if (res.status === 200) {
          addProduct(res.data, 1);
          // setProductsTemp([...productsTemp, res.data]);
          setBarcode("");
          setMessage("");
        }
        if (res.status === 202) {
          PlaySound();
          setMessage(res.data.message);
        }
      } catch (error) {
        throw error;
      }
    } else {
      setProductsTemp([]);
    }
  };
  const FindProductByCode = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/cashier/productcode?code=" + key
      );
      // console.log(res.data);
      setProductsTemp(res.data);
    } catch (error) {
      throw error;
    }
  };
  const FindProductByTitle = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL +
          "/api/cashier/producttitle?title=" +
          key
      );
      setProductsTemp(res.data);
    } catch (error) {
      throw error;
    }
  };
  const FindProductByPage = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/cashier/productpage?page=" + key
      );
      setProductsTemp(res.data);
    } catch (error) {
      throw error;
    }
  };
  const FindProductByNo = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/cashier/productno?No=" + key
      );
      setProductsTemp(res.data);
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <div className=" w-full p-2  rounded-lg shadow-lg bg-white uppercase">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            color="success"
            size="md"
          />
          {message && (
            <span className="ps-2 text-sm mt-2 text-red-500">{message}</span>
          )}
        </form>
      </div>
      <div className=" w-full mt-5 p-2  rounded-lg shadow-lg bg-white h-[62vh] uppercase">
        {/* <p className=' text-center text-lg'>ຄົ້ນຫາສິນຄ້າ</p> */}
        <div className=" flex justify-start gap-2 my-2">
          <span
            onClick={() => {
              setSaerchType("code");
              localStorage.setItem("search_type", "code");
              FindProductByCode();
            }}
            className={`${
              search_type === "code"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
            }  rounded-lg px-2 ease-in-out duration-300 cursor-pointer`}
          >
            code
          </span>
          <span
            onClick={() => {
              setSaerchType("title");
              localStorage.setItem("search_type", "title");
              FindProductByTitle();
            }}
            className={`${
              search_type === "title"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
            }  rounded-lg px-2 ease-in-out duration-300 cursor-pointer`}
          >
            title
          </span>
          <span
            onClick={() => {
              setSaerchType("page");
              localStorage.setItem("search_type", "page");
              FindProductByPage();
            }}
            className={`${
              search_type === "page"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
            }  rounded-lg px-2 ease-in-out duration-300 cursor-pointer`}
          >
            page
          </span>
          <span
            onClick={() => {
              setSaerchType("No");
              localStorage.setItem("search_type", "No");
              FindProductByNo();
            }}
            className={`${
              search_type === "No"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
            }  rounded-lg px-2 ease-in-out duration-300 cursor-pointer`}
          >
            No.
          </span>
        </div>
        <div>
          <Input
            onChange={(e) => setKey(e.target.value)}
            defaultValue={key}
            ref={inputRef}
            type="text"
            label="code"
            color="success"
            size="md"
          />
        </div>
        <div className=" w-full mt-2 h-[70%] overflow-y-auto border">
          <table className="w-full">
            <thead className=" sticky top-0 bg-white shadow-lg uppercase">
              <tr>
                <th className="border  border-gray-300">barcode</th>
                <th className="border  border-gray-300">ຊື່ສິນຄ້າ</th>
                <th className="border  border-gray-300">code</th>
                <th className="border  border-gray-300">page</th>
                <th className="border  border-gray-300">No.</th>
              </tr>
            </thead>
            <tbody>
              {productsTemp.map((product: any, index: number) => {
                return (
                  <tr
                    key={index}
                    onDoubleClick={() => {}}
                    className=" hover:bg-blue-100 ease-in-out duration-300"
                  >
                    <td className="py-2 border  border-gray-300">
                      <Highlighter
                        highlightClassName="bg-yellow-300"
                        searchWords={[barcode]}
                        autoEscape={true}
                        textToHighlight={product.barcode}
                      />
                    </td>
                    <td className="py-2 border  border-gray-300">
                      {search_type === "title" ? (
                        <Highlighter
                          highlightClassName="bg-yellow-300"
                          searchWords={[key]}
                          autoEscape={true}
                          textToHighlight={product.title}
                        />
                      ) : (
                        product.title
                      )}
                    </td>
                    <td className="py-2 border  border-gray-300">
                      {search_type === "code" ? (
                        <Highlighter
                          highlightClassName="bg-yellow-300"
                          searchWords={[key]}
                          autoEscape={true}
                          textToHighlight={product.code}
                        />
                      ) : (
                        product.code
                      )}
                    </td>
                    <td className="py-2 border  border-gray-300 text-center">
                      {search_type === "page" ? (
                        <Highlighter
                          highlightClassName="bg-yellow-300"
                          searchWords={[key]}
                          autoEscape={true}
                          textToHighlight={product.page}
                        />
                      ) : (
                        product.page
                      )}
                    </td>
                    <td className="py-2 border  border-gray-300 text-center">
                      {search_type === "No" ? (
                        <Highlighter
                          highlightClassName="bg-yellow-300"
                          searchWords={[key]}
                          autoEscape={true}
                          textToHighlight={product.No}
                        />
                      ) : (
                        product.No
                      )}
                    </td>
                  </tr>
                );
              })}
              {/* {Array(20).fill(10).map((_, index) => {
                                return (
                                    <tr onDoubleClick={() => { }} className=' hover:bg-blue-100 ease-in-out duration-100'>
                                        <td className='py-2 border  border-gray-300'>0117351880</td>
                                        <td className='py-2 border  border-gray-300'>ນ໋ອດຄານລາກM95.85.70.108.KUBOTA.BL</td>
                                        <td className='py-2 border  border-gray-300'>01173-51880</td>
                                        <td className='py-2 border  border-gray-300'>152</td>
                                        <td className='py-2 border  border-gray-300'>140</td>
                                    </tr>

                                )
                            })} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FindProduct;
