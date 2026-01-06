import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/Pages.css";

export default function Articles() {
  const navigate = useNavigate();
  const [articles] = useState([
    {
      id: 1,
      title: "The Art of Jewelry Making",
      description: "Discover the intricate process of crafting exquisite jewelry pieces.",
      content: "Jewelry making is an ancient art that combines skill, creativity, and precision. Each piece is carefully crafted to showcase the beauty of gemstones and precious metals.",
      date: "2025-12-20"
    },
    {
      id: 2,
      title: "Silver Care Guide",
      description: "Learn how to maintain and care for your silver jewelry.",
      content: "Silver jewelry requires proper care to maintain its shine. Regular cleaning with a soft cloth and storing in a dry place will keep your pieces looking beautiful for years to come.",
      date: "2025-12-15"
    },
    {
      id: 3,
      title: "Understanding Hallmarks",
      description: "What do jewelry hallmarks mean?",
      content: "Hallmarks are official marks stamped on jewelry to indicate its purity and authenticity. 925 hallmark indicates 92.5% pure silver, ensuring quality and value.",
      date: "2025-12-10"
    }
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <button onClick={() => navigate("/")} className="breadcrumb-link">← Back</button>
        <h1>Articles</h1>
      </div>

      <div className="articles-grid">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <h3>{article.title}</h3>
            <p className="article-date">{new Date(article.date).toLocaleDateString()}</p>
            <p className="article-description">{article.description}</p>
            <p className="article-content">{article.content}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
