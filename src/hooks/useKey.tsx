import { useEffect } from "react";

export const useKeyDown = (callback: () => void, keys: string[]) => {
  const onKeyDown = (_event: KeyboardEvent) => {
    const wasAnyKeyPressed = keys.some((key) => _event.key === key);
    if (wasAnyKeyPressed) {
      _event.preventDefault();
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
};
