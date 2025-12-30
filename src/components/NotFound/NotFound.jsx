import { Container } from "../Container/Container";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Container>
      <div style={{ textAlign: "center", color: "white", padding: "100px 0" }}>
        <h1 style={{ fontSize: "6rem", margin: 0 }}>404</h1>
        <p style={{ fontSize: "1.5rem" }}>Упс! Такої сторінки не існує.</p>
        <Link
          to="/"
          style={{
            color: "#498CEC",
            textDecoration: "none",
            fontSize: "1.2rem",
            marginTop: "20px",
            display: "inline-block",
          }}
        >
          Повернутися на Головну
        </Link>
      </div>
    </Container>
  );
};
