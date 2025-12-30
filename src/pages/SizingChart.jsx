import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/Pages.css";

export default function SizingChart() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-header">
        <button onClick={() => navigate("/")} className="breadcrumb-link">← Back</button>
        <h1>Sizing Chart</h1>
      </div>

      <div className="content-section">
        <h2>Ring Size Guide</h2>
        <table className="size-table">
          <thead>
            <tr>
              <th>US Size</th>
              <th>Circumference (mm)</th>
              <th>Diameter (mm)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>5</td><td>49.3</td><td>15.7</td></tr>
            <tr><td>6</td><td>52.4</td><td>16.7</td></tr>
            <tr><td>7</td><td>55.4</td><td>17.6</td></tr>
            <tr><td>8</td><td>58.5</td><td>18.6</td></tr>
            <tr><td>9</td><td>61.5</td><td>19.6</td></tr>
            <tr><td>10</td><td>64.6</td><td>20.6</td></tr>
            <tr><td>11</td><td>67.6</td><td>21.5</td></tr>
            <tr><td>12</td><td>70.7</td><td>22.5</td></tr>
          </tbody>
        </table>

        <h2>Bracelet Size Guide</h2>
        <table className="size-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Wrist Circumference</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>XS</td><td>5.5" - 6"</td><td>6.5"</td></tr>
            <tr><td>S</td><td>6" - 6.5"</td><td>7"</td></tr>
            <tr><td>M</td><td>6.5" - 7"</td><td>7.5"</td></tr>
            <tr><td>L</td><td>7" - 7.5"</td><td>8"</td></tr>
            <tr><td>XL</td><td>7.5" - 8"</td><td>8.5"</td></tr>
          </tbody>
        </table>

        <h2>Necklace Length Guide</h2>
        <table className="size-table">
          <thead>
            <tr>
              <th>Length</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>14" - 16"</td><td>Choker (Close to neck)</td></tr>
            <tr><td>16" - 18"</td><td>Princess (Collarbone)</td></tr>
            <tr><td>18" - 20"</td><td>Matinee (Mid-chest)</td></tr>
            <tr><td>24" - 30"</td><td>Opera (Long)</td></tr>
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}
