
import Header from "./components/Header";
import ImportWoocommerceAttribute from "./components/ImportWoocommerceAttribute";
import CreateWoocommerceAttribute from "./components/CreateWoocommerceAttribute";
import GetWoocommerceAttribute from "./components/GetWoocommerceAttribute";

function App() {
  return (
        <div className="App">
          <Header title="Welcome on the Import Attribute Reader" />
          <ImportWoocommerceAttribute />
            <GetWoocommerceAttribute />
            <CreateWoocommerceAttribute />
        </div>
  );
}

export default App;
