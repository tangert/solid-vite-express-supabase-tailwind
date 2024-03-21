import { render } from "solid-js/web";
import "./index.css";
import { Router, Route } from "@solidjs/router";
import { Counter } from "./Counter";

const App = (props: any) => {
  return (
    <main class="p-2">
      <h1 class="text-3xl font-bold underline">tangert's web stack</h1>
      {props.children}
    </main>
  );
};

const root = document.getElementById("root");
if (!root) {
  throw new Error("No root element found");
}

function Test() {
  return <div>This is just a test div component to show routing.</div>;
}

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Counter} />
      <Route path="/test" component={Test} />
    </Router>
  ),
  root,
);
