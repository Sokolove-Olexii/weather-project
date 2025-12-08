// import { useRef, useEffect, useState } from "react";
// import styles from "./LiquidGlassButton.module.scss";
// import searchImg from "../../images/Svg/searchImg.svg";

// export const LiquidGlassSearch = ({ onSearch }) => {
//   const [query, setQuery] = useState("");
//   const containerRef = useRef(null);
//   const blobRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     const blob = blobRef.current;

//     if (!container || !blob) return;

//     const handleMouseMove = (e) => {
//       const rect = container.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;

//       blob.style.left = `${x}px`;
//       blob.style.top = `${y}px`;
//     };

//     container.addEventListener("mousemove", handleMouseMove);
//     return () => container.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   const handleSearch = () => {
//     if (query.trim()) {
//       onSearch(query.trim());
//       setQuery("");
//     }
//   };

//   const handleKey = (e) => {
//     if (e.key === "Enter") handleSearch();
//   };

//   return (
//     <div ref={containerRef} className={styles.liquidSearch}>
//       <span className={styles.blob} ref={blobRef}></span>
//       <input
//         type="text"
//         placeholder="Search location..."
//         className={styles.liquidSearch_input}
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={handleKey}
//       />
//       <button className={styles.liquidSearch_button} onClick={handleSearch}>
//         <img
//           src={searchImg}
//           alt="Search"
//           className={styles.liquidSearch_icon}
//         />
//       </button>
//     </div>
//   );
// };
