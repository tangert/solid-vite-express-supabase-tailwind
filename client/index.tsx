import { render } from "solid-js/web";
import { Counter } from "./Counter";
import "./index.css";

function App() {
  return (
    <main>
      <h1 class="text-3xl font-bold underline">Hello client/index.tsx</h1>
      <Counter />
    </main>
  );
}

const root = document.getElementById("root");
if (!root) {
  throw new Error("No root element found");
}

render(() => <App />, root);
