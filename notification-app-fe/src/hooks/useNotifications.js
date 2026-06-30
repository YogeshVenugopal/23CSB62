import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchNotifications();

        if (isMounted) {
          setNotifications(data?.notifications ?? []);
          setTotal(data?.total ?? data?.notifications?.length ?? 0);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load notifications");
          setNotifications([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = total > 0 ? Math.ceil(total / 10) : 0;

  return { notifications, total, totalPages, loading, error };
}
