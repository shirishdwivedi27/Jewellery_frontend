import { useNavigate, useParams } from "react-router-dom";
import "../styles/Pages.css";

export default function Policies() {
  const navigate = useNavigate();
  const { type } = useParams();

  const policies = {
    return: {
      title: "Return & Exchange Policy",
      content: `
        <h2>30-Day Return Policy</h2>
        <p>We want you to be completely satisfied with your purchase. If you're not happy with your jewelry, we offer a hassle-free 30-day return or exchange policy.</p>
        
        <h3>Return Conditions:</h3>
        <ul>
          <li>Items must be in original condition (unused, unworn)</li>
          <li>Must include original packaging and tags</li>
          <li>Return within 30 days of purchase</li>
          <li>Customer covers return shipping</li>
        </ul>

        <h3>Refund Timeline:</h3>
        <p>Once we receive and inspect your return, refunds will be processed within 7-10 business days.</p>

        <h3>Exchanges:</h3>
        <p>We offer free exchanges for size or design changes within 30 days of purchase.</p>
      `
    },
    privacy: {
      title: "Privacy Policy",
      content: `
        <h2>Your Privacy Matters to Us</h2>
        <p>We are committed to protecting your personal information and your right to privacy.</p>

        <h3>Information We Collect:</h3>
        <ul>
          <li>Contact information (name, email, phone)</li>
          <li>Billing and shipping addresses</li>
          <li>Payment information</li>
          <li>Order history and preferences</li>
          <li>Website usage data</li>
        </ul>

        <h3>How We Use Your Information:</h3>
        <ul>
          <li>To process your orders</li>
          <li>To send order updates and notifications</li>
          <li>To improve our services</li>
          <li>To send marketing communications (with consent)</li>
        </ul>

        <h3>Data Protection:</h3>
        <p>We use industry-standard security measures to protect your personal information from unauthorized access, alteration, and misuse.</p>

        <h3>Your Rights:</h3>
        <p>You have the right to access, correct, or delete your personal information at any time.</p>
      `
    },
    shipping: {
      title: "Shipping Policy",
      content: `
        <h2>Fast & Secure Shipping</h2>
        <p>We offer reliable shipping options to deliver your jewelry safely and on time.</p>

        <h3>Shipping Methods:</h3>
        <ul>
          <li>Standard Shipping: 5-7 business days</li>
          <li>Express Shipping: 2-3 business days</li>
          <li>Overnight Shipping: Next business day</li>
        </ul>

        <h3>Shipping Costs:</h3>
        <p>Free shipping on orders above ₹2,00,000</p>
        <p>Standard shipping rates apply for orders below ₹2,00,000</p>

        <h3>International Shipping:</h3>
        <p>We ship to select countries. Customs and import duties may apply.</p>

        <h3>Packaging:</h3>
        <p>All items are carefully packaged in secure boxes with tracking information provided.</p>

        <h3>Order Tracking:</h3>
        <p>You will receive a tracking number via email once your order ships.</p>
      `
    },
    terms: {
      title: "Terms & Conditions",
      content: `
        <h2>Terms & Conditions</h2>
        <p>By using our website and making purchases, you agree to these terms and conditions.</p>

        <h3>Use License:</h3>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on our site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose or for any public display</li>
          <li>Attempt to decompile or reverse engineer any software contained on the site</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>

        <h3>Product Information:</h3>
        <p>We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content is accurate or complete.</p>

        <h3>Limitation of Liability:</h3>
        <p>In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption).</p>

        <h3>Product Warranty:</h3>
        <p>All our jewelry comes with a quality assurance guarantee. We guarantee our pieces to be made with 92.5% pure silver as indicated by the hallmark.</p>
      `
    }
  };

  const policy = policies[type] || policies.return;

  return (
    <div className="page-container">
      <div className="page-header">
        <button onClick={() => navigate("/")} className="breadcrumb-link">← Back</button>
        <h1>{policy.title}</h1>
      </div>

      <div className="policy-content">
        <div dangerouslySetInnerHTML={{ __html: policy.content }} />
      </div>


    </div>
  );
}
