import { useEffect, useState } from "react";
import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const [imageFile, setImageFile] = useState(null);

  const [metalRates, setMetalRates] = useState({
    gold: null,
    silver: null,
  });

  const [showRateModal, setShowRateModal] = useState(false);
  const [rateForm, setRateForm] = useState({
    metal_type: "gold",
    base_rate: "",
    premium: "",
  });



  const [form, setForm] = useState({
    name: "",
    category: "Rings",
    description: "",
    stock: "",
    quantity: "",
    metal_name: "Gold",
    images: "",
    price:"",
    weight: "",        // in future calc. yaha use kr skte hai lekin req ke acc..... noted
    final_price: "" ,
    making_charge: "",
    price_per_gram: "",
    gst_val:""
  });


  const API_BASE = "http://localhost:5000";  


  const openEditModal = (product) => {
  setIsEditMode(true);
  setEditProductId(product.id);

    setForm({
    name: product.name || "",
    category: product.category || "Rings",
    description: product.description || "",
    stock: product.stock || "",
    quantity: product.quantity || "",
    metal_name: product.metal_name || "Gold",
    images: product.images || "",
    price: product.price || "",
    weight: product.weight || "",
    final_price: product.final_price || "",
    making_charge: product.making_charge || "",
    price_per_gram: product.price_per_gram || "",
    gst_val: product.gst_val || ""
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
  stock: Number(form.stock),
  quantity: Number(form.quantity),
  metal_name: form.metal_name,
  images: form.images,

  weight: Number(form.weight),
  making_charge: Number(form.making_charge),

  price_per_gram: Number(form.price_per_gram),
  gst_val: Number(form.gst_val),
  final_price: Number(form.final_price)
};

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

const fetchMetalRates = async () => {
  const res = await fetch(`${API_BASE}/api/admin/metal-rates`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  setMetalRates(data);
};

const saveMetalRate = async () => {
  await fetch(`${API_BASE}/api/admin/metal-rates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(rateForm),
  });

  setShowRateModal(false);
  fetchMetalRates();
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
  const res = await fetch(`${API_BASE}/api/products`, {
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
    // console.log("FORM DATA:", form);       // ✅ yahan
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
    fetchMetalRates();
  }, []);

 
  // useEffect(() => {

  // if (!showModal || isEditMode) return;

  // if (!metalRates) return;

  // const metal = form.metal_name?.toLowerCase();
  // let calculatedPrice = "";

  // if (metal === "gold" && metalRates.gold) {
  //   const goldRate = Number(metalRates.gold.base_rate || 0);
  //   const goldPremium = Number(metalRates.gold.premium || 0);

  //   calculatedPrice = goldRate + goldPremium / 10;
  // }

  // if (metal === "silver" && metalRates.silver) {
  //   const silverRate = Number(metalRates.silver.base_rate || 0);
  //   const silverPremium = Number(metalRates.silver.premium || 0);

  //   calculatedPrice = silverRate + silverPremium / 1000;
  // }

  // if (calculatedPrice) {
  //   setForm((prev) => ({
  //     ...prev,
  //     price_per_gram: calculatedPrice.toFixed(2),
  //   }));
  // }
  // }, [
  //   showModal,
  //   form.metal_name,
  //   metalRates,
  //   isEditMode,
  // ]);

useEffect(() => {
  if (!showModal) return;
  if (!metalRates) return;

  if (isEditMode && form.price_per_gram) return;

  const metal = form.metal_name?.toLowerCase();
  let calculatedPrice = "";

  if (metal === "gold" && metalRates.gold) {
    const goldRate = Number(metalRates.gold.base_rate || 0);
    const goldPremium = Number(metalRates.gold.premium || 0);
    calculatedPrice = goldRate + goldPremium / 10;
  }

  if (metal === "silver" && metalRates.silver) {
    const silverRate = Number(metalRates.silver.base_rate || 0);
    const silverPremium = Number(metalRates.silver.premium || 0);
    calculatedPrice = silverRate + silverPremium / 1000;
  }

  if (calculatedPrice) {
    setForm((prev) => ({
      ...prev,
      price_per_gram: calculatedPrice.toFixed(2),
    }));
  }
}, [
  showModal,
  form.metal_name,
  metalRates,
  isEditMode,
  form.price_per_gram
]);


useEffect(() => {
  const price = Number(form.price_per_gram);
  const weight = Number(form.weight);

  if (!price || !weight) {
    setForm((prev) => ({ ...prev, final_price: "" }));
    return;
  }

  const finalPrice = price * weight;

  setForm((prev) => ({
    ...prev,
    final_price: finalPrice.toFixed(2),
  }));
}, [form.weight]);


useEffect(() => {
  const final = Number(form.final_price);
  const making = Number(form.making_charge);

  if (!final || !making) return;
  
  const makingAmount = ( final * making) / 100;

  setForm((prev) => ({
    ...prev,
    final_price: (final + makingAmount).toFixed(5),
  }));
}, [form.making_charge]);



useEffect(() => {
  const final = Number(form.final_price);
  const gstval = Number(form.gst_val);

  if (!final || !gstval) return;

  const official_amount = (final * (gstval + 100))/100 ;

  setForm((prev) => ({
    ...prev,
    final_price: (official_amount).toFixed(2),
  }));
}, [form.gst_val]);




//   useEffect(() => {
//   if (!metalRates || isEditMode) return;

//   const metal = form.metal_name?.toLowerCase();
//   const rate = metalRates[metal];

//   if (rate) {
//     const basePrice =
//       Number(rate.base_rate || 0) + Number(rate.premium || 0);

//     setForm((prev) => ({
//       ...prev,
//       price: basePrice,
//     }));
//   }
// }, [form.metal_name, metalRates]);

// useEffect(() => {
//   const price = parseFloat(form.price);
//   const weight = parseFloat(form.weight);

//   if (!price || !weight) {
//     setForm((prev) => ({ ...prev, final_price: "" }));
//     return;
//   }

//   const finalPrice = price * weight;

//   setForm((prev) => ({
//     ...prev,
//     final_price: finalPrice.toFixed(2),
//   }));
// }, [form.price, form.weight]);


// useEffect(() => {
//   if (!showModal || !metalRates) return;

//   const metal = form.metal_name.toLowerCase();
//   const rate = metalRates[metal];
//   if (!rate) return;

//   const price =
//     Number(rate.base_rate || 0) +
//     Number(rate.premium || 0);

//   setForm(prev => ({
//     ...prev,
//     price_per_gram: price.toFixed(2)
//   }));
// }, [showModal, form.metal_name, metalRates]);


  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Hridika Jewels – Admin</h1>
        <button className="logout-btn"
        onClick={()=>navigate("/admin/bespoke")}>Bespoke_Query</button>
      </header>
      

        <div className="rate-buttons">
        <button
          className="rate-btn gold"
          onClick={() => {
            setRateForm({ metal_type: "gold", base_rate: "", premium: "" });
            setShowRateModal(true);
          }}
        >
          🟡 Set Gold Rate
        </button>

        <button
          className="rate-btn silver"
          onClick={() => {
            setRateForm({ metal_type: "silver", base_rate: "", premium: "" });
            setShowRateModal(true);
          }}
        >
        ⚪ Set Silver Rate
        </button>
      </div>

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
                        weight: "",
                        final_price: "",
                        making_charge: "",
                        price_per_gram: "",
                        gst_val: ""
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
              <Select label="Metal" options={["Gold", "Silver"]} value={form.metal_name} onChange={(v) => setForm({ ...form, metal_name: v })} />
            </div>

            <div className="row">
              <Input label="Stock" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} />
              <Input label="Quantity" value={form.quantity} onChange={(v) => setForm({ ...form, quantity: v })} />
            </div>

           {/* <Input label="Image URL" value={form.images} onChange={(v) => setForm({ ...form, images: v })} />*/}
           <label>Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect} // <-- converts image to base64 and sets form.images
          />


            {/* <Input label="Price" value={form.price} onChange={(v) => setForm({ ...form,price: v })}/>

            <Input
                label="Price (per gram)"
                 value={form.price}
                  onChange={(v) => setForm({ ...form, price: v })}
                      readOnly
                    />

                    <Input
                      label="Weight (grams)"
                      value={form.weight}
                      onChange={(v) => setForm({ ...form, weight: v })}
                    />

                    <Input
                      label="Final Price"
                      value={form.final_price}
                     readOnly
                    /> */}
                    <Input label="Price per gram" value={form.price_per_gram} readOnly />

                    <Input
                      label="Weight (grams)"
                      value={form.weight}
                      onChange={(v) => setForm({ ...form, weight: v })}
                    />

                    <Input
                      label="Making Charges"
                      value={form.making_charge}
                      onChange={(v) => setForm({ ...form, making_charge: v })}
                    />

                    <Input
                      label="GST.IN"
                      value={form.gst_val}
                      onChange={(v) => setForm({ ...form, gst_val: v })}
                    />

                  <Input label="Final Price" value={form.final_price} readOnly />

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

      {showRateModal && (
      <div className="modal-backdrop">
      <div className="modal">
      <h3>
        Set {rateForm.metal_type.toUpperCase()} Rate
      </h3>

      <Input
        label="Metal_Rate (per gram)"
        value={rateForm.base_rate}
        onChange={(v) =>
          setRateForm({ ...rateForm, base_rate: v })
        }
      />

        <Input
          label="Premium"
          value={rateForm.premium}
          onChange={(v) =>
          setRateForm({ ...rateForm, premium: v })
        }
        />

        <div className="modal-actions">
        <button onClick={() => setShowRateModal(false)}>
          Cancel
        </button>
        <button className="primary-btn" onClick={saveMetalRate}>
          Save Rate
        </button>
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

