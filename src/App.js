import "./index.css";
import Cell from "./components/Cell";
import Footer from "./components/Footer";

function App() {
    return (
        <main>
            <h1 className="title">Jogo da velha</h1>
            <Cell />
            <Footer />
        </main>
    );
}

export default App;
