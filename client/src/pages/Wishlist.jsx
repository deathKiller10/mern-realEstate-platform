import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No items added</p>
      ) : (
        wishlist.map((item) => (
          <div
            key={item._id}
            className="border p-4 mb-3 rounded shadow"
          >
            <h3>{item.title}</h3>
            <p>{item.location}</p>
            <p>₹ {item.price}</p>

            <button
              onClick={() => removeFromWishlist(item._id)}
              className="bg-red-600 text-white px-3 py-1 mt-2 rounded"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;