import "./styles.css";
import { useState, useEffect } from "react";

const API = "https://dummyjson.com/products";
// Add buuton
export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setData(data.products);
    } catch (error) {
      console.log("Error -", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Product Loading...</div>;
  }
  if (data.length == 0) {
    return <div>Product List Empty</div>;
  }

  return (
    <div className="App">
      <h1>Product List</h1>
      <button onClick={() => getProductList()}>Refresh Product</button>
      {data.map((_val, i) => {
        return (
          <div key={_val.id} style={{ border: "1px solid red" }}>
            <p>
              {_val.id} {_val.title}{" "}
            </p>
            <p>Price : {_val.price} </p>
          </div>
        );
      })}
    </div>
  );
}
