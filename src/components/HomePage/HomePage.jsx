import { Header } from "../Header/Header.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { Hero } from "../Hero/Hero.jsx";

export const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
};
