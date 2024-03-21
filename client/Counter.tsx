import { createSignal, createEffect } from "solid-js";
import { useServer } from "./utils";

export function Counter() {
  const [count, setCount] = createSignal(0);
  const [getData, { refetch: getRefetch }] = useServer("/getTest");
  const [postData, { refetch: postRefetch }] = useServer("/postTest", {
    method: "POST",
  });

  return (
    <div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setCount((c) => c + 1);
          getRefetch();
          postRefetch();
        }}
      >
        Counter: {count()}
      </button>
      <p>Get request: {JSON.stringify(getData())}</p>
      <p>Post request: {JSON.stringify(postData())}</p>
    </div>
  );
}
