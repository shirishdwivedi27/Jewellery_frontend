import { useEffect, useState } from "react";

// GET → http://localhost:5000/api/bespoke-requests

export default function BespokeQuery() {
  const [bespokeList, setBespokeList] = useState([]);

  useEffect(() => {
    fetchBespokeRequests();
  }, []);

  const fetchBespokeRequests = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch("https://flask-api-s.onrender.com/api/bespoke-requests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBespokeList(data);
    } catch (err) {
      console.error("Error fetching bespoke requests", err);
    }
  };

  return (
    <div className="admin-page">
      <h2>Bespoke Requests</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Product</th>
            <th>Details</th>
            <th>Size</th>
            <th>Image</th>
          </tr>
        </thead>

        <tbody>
          {bespokeList.length === 0 ? (
            <tr>
              <td colSpan="6">No Bespoke Requests Found</td>
            </tr>
          ) : (
            bespokeList.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.product}</td>
                <td>{item.details}</td>
                <td>{item.size}</td>
                <td>
                  {item.image ? (
                    <img
                      src={item.image}   
                      alt="Design"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}