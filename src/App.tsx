import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, fas } from "@fortawesome/free-solid-svg-icons";
import Orders from "./components/Orders";

library.add(fas, faEye);

function App() {
  return (
    <div className="p-8">
      <Orders />
    </div>
  );
}

export default App;
