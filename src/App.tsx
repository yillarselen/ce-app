import Orders from "./components/Orders/Orders";
import registerIcons from "./utils/registerIcons";

registerIcons();

function App() {
  return (
    <div className="p-8">
      <Orders />
    </div>
  );
}

export default App;
