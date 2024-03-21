import { createSignal, createEffect } from "solid-js";
import { useServer } from "./utils";
import { Apple } from "lucide-solid";

export function Counter() {
  const [count, setCount] = createSignal(0);
  const [getData, { refetch: getRefetch }] = useServer("/getTest");
  const [postData, { refetch: postRefetch }] = useServer("/postTest", {
    method: "POST",
  });

  createEffect(() => {
    console.log(`this will log whenever count changes: ${count()}`);
  });

  return (
    <div>
      <button
        class="flex flex-row gap-1 items-center align-center bg-blue-500 hover:bg-blue-700 text-white text-md font-medium py-2 px-3 rounded-lg"
        onClick={() => {
          setCount((c) => c + 1);
          getRefetch();
          postRefetch();
        }}
      >
        <Apple size={16} />
        Counter: {count()}
      </button>
      <p>Get request: {JSON.stringify(getData())}</p>
      <p>Post request: {JSON.stringify(postData())}</p>
    </div>
  );
}
