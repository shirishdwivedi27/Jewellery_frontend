import { useEffect, useState } from "react";
import "../styles/Admin.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const token = localStorage.getItem("access_token");
  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "Rings",
    description: "",
    stock: "",
    quantity: "",
    metal_name: "Gold",
    images: "",
    price:"",
  });


  // const API_BASE = "https://flask-api-s.onrender.com";
const API_BASE = "http://localhost:5000";

  // const fetchProducts = async () => {
  //   const res = await fetch(`${API_BASE}/products`);   
  //   const data = await res.json();
  //   setProducts(data);
  // };

  const openEditModal = (product) => {
  setIsEditMode(true);
  setEditProductId(product.id);

  setForm({
    name: product.name,
    category: product.category,
    description: product.description,
    stock: product.stock,
    quantity: product.quantity,
    metal_name: product.metal_name,
    images: product.images,
    price: product.price,
  });

  setShowModal(true);
};

const updateProduct = async () => {
      if (!token) {
    alert("Session expired. Please login again.");
    return;
  }
const payload = {
  name: form.name,
  category: form.category,
  description: form.description,
  metal_name: form.metal_name || "Gold",
  stock: Number(form.stock || 0),
  price: Number(form.price || 0),
  quantity: form.quantity ? String(form.quantity) : "0",
  images: form.images && form.images !== "" 
            ? form.images 
            : products.find(p => p.id === editProductId)?.images
};
console.log("FINAL UPDATE PAYLOAD =>", payload);
await fetch(`${API_BASE}/products/${editProductId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(payload),
});


  setShowModal(false);
  setIsEditMode(false);
  setEditProductId(null);
  fetchProducts();
};


// Delete Product
const handleDelete = async (productId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?");
    if (!confirmDelete) return;

  try {
    const res =   await fetch(`${API_BASE}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    const data = await res.json();

    if (res.ok) {
      alert("Product deleted successfully");

      // Update frontend immediately
      setProducts((prev) =>
        prev.filter((product) => product.id !== productId)
      );
    } else {
      alert(data.message || "Failed to delete product");
    }
  } catch (err) {
    console.error(err);
    alert("Server error while deleting product");
  }
};

  const fetchProducts = async () => {
  const res = await fetch(`${API_BASE}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  setProducts(data);
};

  const fetchCustomers = async () => {
    const res = await fetch(`${API_BASE}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCustomers(data);
  };

  const fetchOrders = async () => {
    const res = await fetch(`${API_BASE}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data);
  };


  const handleImageSelect = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setForm({ ...form, images: reader.result }); // ✅ base64 URL
  };
  reader.readAsDataURL(file);
};


  const addProduct = async () => {
     console.log("FORM DATA:", form);      
    //  console.log("IMAGE:", form.images); 
    
    await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setShowModal(false);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchCustomers();
  }, []);

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Hridika Jewels – Admin</h1>
        <button className="logout-btn">Logout</button>
      </header>

      <div className="stats">
        <Stat title="Total Products" value={products.length} icon="📦" />
        <Stat title="Total Orders" value={orders.length} icon="🛒" />
        <Stat title="Total Customers" value={customers.length} icon="👥" />
        <Stat title="Total Revenue" value="$2646" icon="💰" />
      </div>

      <div className="tabs">
  <button className={activeTab === "products" ? "active" : ""} onClick={() => setActiveTab("products")}> Products </button>

  <button className={activeTab === "customers" ? "active" : ""} onClick={() => setActiveTab("customers")}> Customers </button>

  <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")} > Orders </button> </div>


      {activeTab === "products" && (
        <div className="card">
          <div className="card-header">
            <h2>Manage Products</h2>
            {/* <button className="primary-btn" onClick={() => setShowModal(true)}>+ Add Product</button> */}
            <button
                  className="primary-btn"
                    onClick={() => {
                      setIsEditMode(false);
                      setEditProductId(null);
                      setForm({
                        name: "",
                        category: "Rings",
                        description: "",
                        stock: "",
                        quantity: "",
                        metal_name: "Gold",
                        images: "",
                        price: "",
                      });
                      setShowModal(true);
                    }}
                  >
                    + Add Product
                  </button>


          </div>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="product-cell">
                    <img src={p.images} alt={p.name} style={{ width: 50, height: 50, objectFit: "cover" }} />
                    <div>
                      <b>{p.name}</b>
                      <p>{p.description}</p>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td>₹{p.price}</td>
                  <td>
                    <span className={p.stock < 10 ? "stock low" : "stock ok"}>{p.stock}</span>
                  </td>
                  <td>{p.quantity}</td>
                  
                  <td className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => openEditModal(p)}
                      >
                        ✏️
                      </button>
                        {/* Delete */}
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(p.id)}
                        >
                          🗑️
                        </button>
                    </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="card">
          <h2>Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Address</th>
                <th>Status</th>
                <th>Payment_Method</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                   <tr key={o.id}>
                     <td>{o.id}</td>
                     <td>{o.address}</td>
                     <td>{o.status}</td>
                     <td>{o.payment_method}</td>
                     <td>{new Date(o.created_at).toLocaleString()}</td>
                   </tr>
                 ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "customers" && (
        <div className="card">
          <h2>Customers</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th> 
                <th>Email</th> 
                <th>Phone</th> 
                <th>Status</th> 
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                  <tr key={c.user_id}>
                    <td>{c.username}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{new Date(c.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{isEditMode ? "Edit Product" : "Add New Product"}</h3>


            <Input label="Product Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Input label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />

            <div className="row">
              <Select label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
              <Select label="Metal" options={["Gold", "Silver"]} value={form.metal_name|| "Gold"} onChange={(v) => setForm({ ...form, metal_name: v })} />
            </div>

            <div className="row">
              <Input label="Stock" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} />
              <Input label="Size" value={form.quantity} onChange={(v) => setForm({ ...form, quantity: v })} />
            </div>

           {/* <Input label="Image URL" value={form.images} onChange={(v) => setForm({ ...form, images: v })} />*/}
           <label>Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect} // <-- converts image to base64 and sets form.images
          />
            <Input label="Price" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
             {isEditMode ? (
                  <button className="primary-btn" onClick={updateProduct}>
                    Update Product
                  </button>
                ) : (
                  <button className="primary-btn" onClick={addProduct}>
                    Add Product
                  </button>
                )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Stat = ({ title, value, icon }) => (
  <div className="stat">
    <div className="stat-left">
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
    <div className="stat-icon">{icon}</div>
  </div>
);

const Input = ({ label, value, onChange }) => (
  <div className="field">
    <label>{label}</label>
    <input value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const Select = ({ label, value, onChange, options = ["Bangles","Rings", "Earrings", "Bracelets", "Necklaces"] }) => (
  <div className="field">
    <label>{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);


// size = quantity