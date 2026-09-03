import { useEffect, useState } from "react";

import { supabase } from "../../config/supabaseConfig";
import { products as localProducts } from "../data/products";

export function useProducts(user) {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        setProducts(localProducts);
        return;
      }

      setProducts(data?.length ? data : localProducts);
    }

    loadProducts();
  }, [user]);

  return products;
}
