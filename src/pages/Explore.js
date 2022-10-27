import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { API } from "../API";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import emptyBox from "../imgs/emptyBox.png";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
export default function Explore() {
  const options = [
    { value: "MachanicalTools", label: "Machanical Tools" },
    { value: "Fashion", label: "Fashion" },
    { value: "Vehical", label: "Vehicle" },
    { value: "Imiation", label: "Imiation" },
  ];

  const { search } = useLocation();

  const [keyword, setKeyWord] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const x1 = new URLSearchParams(search).get("keyword") || null;
  const [isLoading, setIsLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const changeCategories = (val) => {
    setFirstTime(false);
    if (category.indexOf(val) != -1) {
      setcategory(category.filter((cat) => cat != val));
    } else {
      setcategory([...category, val]);
    }
  };

  useEffect(() => {
    if (x1) setKeyWord(x1);
  }, [x1]);

  useEffect(() => {
    if (keyword) searchProducts();
  }, [keyword]);
  useEffect(() => {
    if (!firstTime) searchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API + "/product/findall");
      setProducts(res.data);
      setKeyWord("");
      setcategory([]);
    } catch (e) {}
    setIsLoading(false);
  };

  const searchProducts = async () => {
    setIsLoading(true);
    // let categoriesValue = category.map(ctg => ctg.value)
    let categoriesValue = category;
    // console.log(categoriesValue);
    let queryKeyword = keyword || "";
    try {
      const res = await axios.get(
        API +
          `/product/search?keyword=${queryKeyword}&category=${categoriesValue}&page=1&limit=10`
      );

      // console.log(res.data);

      setProducts(res.data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      className="page explore"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="top flex-col">
        <b>Showing Results of : {keyword || "All"}</b>

        {/* <Select className="select"
        
        options={options} isMulti  

          value={category}
              onChange={(value) =>{ setcategory(value)}}
        
            /> */}

        {/* <div className="search">
          <input type="text" value={keyword} onChange={(e)=>{
            setKeyWord(e.target.value)
          }}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              searchProducts()
            }
          }}
          />
          <button className="green roundBtn" onClick={searchProducts}><i className="im im-magnifier"></i></button>
        </div> */}

        <div className="categories">
          <div className={`pill blue filterpill`}>
            <i className="im im-filter"></i>
          </div>
          <button
            className={`pill yellow`}
            onClick={() => {
              fetchProducts();
            }}
          >
            All
          </button>
          {options.map((op) => (
            <button
              className={`pill ${
                category.indexOf(op.value) != -1 ? "blue" : "yellow"
              }`}
              onClick={() => {
                changeCategories(op.value);
              }}
            >
              {op.value}
            </button>
          ))}
        </div>
      </div>

      <div className="listProduct">
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : products.length ? (
          products.map((product, index) => (
            <>
              <ProductCard index={index} {...product} />
            </>
          ))
        ) : (
          <div className="flex-col">
            <img height={80} width={80} src={emptyBox} />
            No Products
          </div>
        )}
      </div>
    </motion.div>
  );
}
