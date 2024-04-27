
import Header from "./components/Header";
import ImportWoocommerceAttribute from "./components/ImportWoocommerceAttribute";
import CreateWoocommerceAttribute from "./components/CreateWoocommerceAttribute";
import GetWoocommerceAttribute from "./components/GetWoocommerceAttribute";
import RemoveWoocommerceAttribute from "./components/RemoveWoocommerceAttribute";

function App() {
  return (
        <div className="App">
          <Header title="Welcome on the Import Attribute Reader" />
          <ImportWoocommerceAttribute />
            <RemoveWoocommerceAttribute />
            <GetWoocommerceAttribute />
            <CreateWoocommerceAttribute />
        </div>
  );
}

export default App;
