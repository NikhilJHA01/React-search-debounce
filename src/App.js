import { useState, useCallback } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([{ name: "asd" }, { name: "dasd" }]);

  const debounce = (fn) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      let context = this;
      timer = setTimeout(() => {
        timer = null;
        fn.apply(context, args);
      }, 500);
    };
  };

  const handleChange = (e) => {
    fetch(`https://demo.dataverse.org/api/search?q=${e.target.value}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data.items);
      });
  };

  const optimisedfunc = useCallback(debounce(handleChange), []);

  return (
    <div className="App">
      <input
        className={"search"}
        placeholder="Type to search"
        type="text"
        onChange={optimisedfunc}
      />
      {data.length > 0 && (
        <div className={"autocomplete"}>
          {data.map((item, index) => (
            <div key={index} className={"autocompleteitems"}>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
