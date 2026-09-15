import { useEffect, useState } from "react";

export function useToggleActive(
  initialActive = false,
  initialCount = 0,
  onToggleApi,
) {
  const [Active, setActive] = useState(initialActive);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActive(initialActive);
    setCount(initialCount);
  }, [initialActive, initialCount]);

  const toggle = async () => {
    if (loading) return;

    const previousActive = Active;
    const previousCount = count;

    setLoading(true);

    setActive(!previousActive);
    setCount(previousActive ? previousCount - 1 : previousCount + 1);
    try {
      await onToggleApi();
    } catch (e) {
      setActive(previousActive);
      setCount(previousCount);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { Active, count, setCount, toggle, loading };
}
