import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [Data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [msg, setMsg] = useState(0);
  const limit = 10;

  async function Fetch(URL) {
    let res = await fetch(URL);
    let data = await res.json();
    setData(data.products);
  }

  useEffect(() => {
    Fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`);
  }, [skip]);
  if (Data) {
    return (
      <div>
        <h1
          style={{
            textAlign: "center",
            position: "sticky",
            top: "0",
            width: "100%",
            backgroundColor: "black",
          }}
        >
          ROHAN BABA .com
        </h1>
        <div
          className="card"
          style={{
            backgroundColor: "beige",
            display: "grid",
            gridTemplateColumns: "repeat(3, 400px)",
            rowGap: "20px",
            columnGap: "20px",
            justifyContent: "center",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          {Data.map((item) => {
            return (
              <div
                style={{
                  backgroundColor: "black",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                  borderRadius: "10%",
                }}
              >
                <img
                  src={item.images[0]}
                  style={{ width: "300px", height: "200px" }}
                ></img>
                <div style={{ width: "300px" }}>
                  <p>{item.title}</p>
                  <p style={{ fontWeight: "100" }}>by {item.brand}</p>
                  <p>
                    Price : {item.price} /- (Discount :{" "}
                    {item.discountPercentage}%)
                  </p>
                  <p>User Rating : {item.rating} (out of 5)</p>
                  <p>Only {item.stock} left in stock!</p>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="buttons"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "sticky",
            bottom: "0",
            backgroundColor: "black",
            width: "100%",
            height: "30px",
            gap: "20px",
          }}
        >
          <button
            onClick={
              msg != 0
                ? skip == limit
                  ? () => {
                      setMsg(0);
                      setSkip(skip - limit);
                    }
                  : () => {
                      msg == 90 ? setMsg(45) : null;
                      setSkip(skip - limit);
                    }
                : null
            }
            style={
              msg == 0
                ? { height: "25px", backgroundColor: "grey" }
                : { height: "25px" }
            }
          >
            {/* {msg == 0 ? `This is the first page` : `Prev`} */}
            Prev
          </button>
          <button
            onClick={
              msg != 90
                ? skip == (100 / limit - 2) * 10
                  ? () => {
                      setMsg(90);
                      setSkip(skip + limit);
                    }
                  : () => {
                      msg == 0 ? setMsg(45) : null;
                      setSkip(skip + limit);
                    }
                : null
            }
            style={
              msg == 90
                ? { height: "25px", backgroundColor: "grey" }
                : { height: "25px" }
            }
          >
            {/* {msg == 90 ? `No more products to show!` : `Next`} */}
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default App;
