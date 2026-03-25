import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Search() {
  const [results, setResults] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query]);

  const fetchResults = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/properties/search?query=${query}`
      );
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Results for "{query}"</h2>

      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        results.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.location}</p>
            <p>Area: {item.area} sq.ft</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Search;