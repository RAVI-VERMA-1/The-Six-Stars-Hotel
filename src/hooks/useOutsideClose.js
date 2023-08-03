import { useEffect, useRef } from "react";

function useOutsideClose(close, capturing = false) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }
      document.addEventListener("click", handleClick, capturing);
      return () =>
        document.removeEventListener("click", handleClick, capturing);
    },
    [close]
  );
  return { ref };
}

export default useOutsideClose;
