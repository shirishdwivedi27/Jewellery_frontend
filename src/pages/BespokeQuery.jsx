import { useEffect, useState } from "react";


// http://localhost:5000/api/bespoke-requests

export default function BespokeQuery() {
  const [bespokeList, setBespokeList] = useState([]);

  useEffect(() => {
    fetchBespokeRequests();
  }, []);

  const fetchBespokeRequests = async () => {
    const token = localStorage.getItem("access_token");

    const res = await fetch("https://flask-api-s.onrender.com/api/bespoke-requests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setBespokeList(data);
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
          {bespokeList.map((item) => (
            <tr key={item.id}>
              <td>{item.full_name}</td>
              <td>{item.phone}</td>
              <td>{item.product_type}</td>
              <td>{item.design_details}</td>
              <td>{item.size}</td>
              <td>
                {item.image_url && (
                  <a href={item.image_url} target="_blank" rel="noreferrer">
                    View
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
