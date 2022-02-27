import "./App.css";
import Layout from "./components/Layout";
import Header from "./components/header/Header";
import Palatte from "./components/palatte/Palatte";
import CardHolder from "./components/cardHolder/CardHolder";

function App() {
  return (
    <>
      <Header />
      <Layout>
        <div className="main">
          <Palatte />
          <CardHolder />
        </div>
      </Layout>
    </>
  );
}

export default App;
