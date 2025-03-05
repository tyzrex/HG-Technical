import type { Product, User } from "@/types/index";

const API_URL = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchProductById(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
}

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
