import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

// Define response types
interface ApiResponse<T> {
  data: T;
}

interface ReviewObject {
  productId: number;
  // userId: number;
  name:string;
  raiting: number;
  content: string;
  // Add other properties as necessary
}

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}


// Define common types
interface ProductFilterParams {
  id: string;
}

interface ProductByNameParams {
  Name: string;
}

interface CartProduct {
  id: number;
  quantity: number;
}

interface RegisterResponse {
  token: string;
}

interface LoginResponse {
  token: string;
}

// Fetch categories
export const getdata = createAsyncThunk<Category[]>(
  "zapros/getdata",
  async () => {
    try {
      const { data } = await axiosRequest.get<ApiResponse<Category[]>>(`api/categories`);
      return data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Fetch subcategories by ID
export const getBySubCategory = createAsyncThunk<Product[], number>(
  "zapros/getBySubCategory",
  async (id) => {
    try {
      const { data } = await axiosRequest.get<ApiResponse<Product[]>>(
        `Product/get-products?SubcategoryId=${id}`
      );
      return data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Fetch all subcategories
export const getSubCategory = createAsyncThunk<SubCategory[]>(
  "zapros/getSubCategory",
  async () => {
    try {
      const { data } = await axiosRequest.get<ApiResponse<SubCategory[]>>(`api/sub-categories`);
      return data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Fetch more subcategories
export const getMoreSubCategories = createAsyncThunk<SubCategory[]>(
  "zapros/getMoreSubCategories",
  async () => {
    try {
      const { data } = await axiosRequest.get<ApiResponse<SubCategory[]>>(`api/sub-categories`);
      return data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Fetch brands
export const getBrands = createAsyncThunk<any>(
  "zapros/getBrands",
  async () => {
    try {
      const { data } = await axiosRequest.get<ApiResponse<any>>(`api/brands`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Fetch product by ID
export const getproductbyid = createAsyncThunk<Product, number>(
  "zapros/getproductbyid",
  async (id) => {
    try {
      const { data } = await axiosRequest.get<ApiResponse<Product>>(`api/products/${id}`);
      return data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Fetch product by name
export const getproductbyname = createAsyncThunk<Product[], string>(
  "zapros/getproductbyname",
  async (name, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get<ApiResponse<Product[]>>(
        `api/products?Name=${name}`
      );
      console.log("API Response:", data);
      return data as any;
    } catch (error: any) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



// Fetch cart products
export const getcart = createAsyncThunk<CartProduct[]>(
  "zapros/getcart",
  async () => {
    try {
      const { data } = await axiosRequest.get<ApiResponse<CartProduct[]>>(
        `Cart/get-products-from-cart`
      );
      return data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Add product to cart
export const postcart = createAsyncThunk<void, number>(
  "zapros/postcart",
  async (id, { dispatch }) => {
    try {
      await axiosRequest.post(`Cart/add-product-to-cart?id=${id}`);
      dispatch(getcart());
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Increment product quantity in cart
export const inccart = createAsyncThunk<void, number>(
  "zapros/inccart",
  async (id, { dispatch }) => {
    try {
      await axiosRequest.put(`Cart/increase-product-in-cart?id=${id}`);
      dispatch(getcart());
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Decrement product quantity in cart
export const redcart = createAsyncThunk<void, number>(
  "zapros/redcart",
  async (id, { dispatch }) => {
    try {
      await axiosRequest.put(`Cart/reduce-product-in-cart?id=${id}`);
      dispatch(getcart());
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const postreview = createAsyncThunk(
  "zapros/postreview",
  async (obj: ReviewObject, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.post(`api/product-reviews`, obj);
      return data; // Return the data if needed
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Register user
export const register = createAsyncThunk<RegisterResponse, { firstName: string;phoneNumber:string;password:string;confirmPassword:string; lastName: string }>(
  "zapros/register",
  async (userData) => {
    try {
      const { data } = await axiosRequest.post<ApiResponse<RegisterResponse>>(
        `api/auth/register`,
        userData
      );
      return data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Login user
export const login = createAsyncThunk<LoginResponse, { phoneNumber: string; password: string }>(
  "zapros/login",
  async (userData) => {
    try {
      const { data } = await axiosRequest.post<ApiResponse<LoginResponse>>(
        `api/auth/login`,
        userData
      );
      return data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Remove product from cart
export const delcart = createAsyncThunk<void, number>(
  "zapros/delcart",
  async (id, { dispatch }) => {
    try {
      await axiosRequest.delete(`Cart/delete-product-from-cart?id=${id}`);
      dispatch(getcart());
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const delproduct = createAsyncThunk<void, number>(
  "zapros/delproduct",
  async (id) => {
    try {
      let data = await axiosRequest.delete(`api/products/${id}`);
      return data.data
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);


export const getProductById = createAsyncThunk(
  "zapros/getProductById",
  async function (id: string) {
    try {
      const { data } = await axiosRequest.get(`api/products/with-attributes/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getbyid = createAsyncThunk(
  "zapros/getbyid",
  async function (id: number) {
    try {
      const { data } = await axiosRequest.get(`api/categories/${id}`);
      return data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getcategory = createAsyncThunk(
  "zapros/getcategory",
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await axiosRequest.get(`api/categories`);
      return data.data;
    } catch (error) {
      const err = error as any;
      console.error("Error fetching categories:", err);
      return rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

export const getproduct = createAsyncThunk(
  "zapros/getproduct",
  async function (search?: string) {
    try {
      const { data } = await axiosRequest.get(
        search ? `api/products?ToDoName=${search}` : `api/products`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getproductbyalsocategory = createAsyncThunk(
  "zapros/getproductbyalsocategory",
  async function (id: string) {
    try {
      const { data } = await axiosRequest.get(`api/products?CategoryId=${id}`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getproductbybrandid = createAsyncThunk(
  "zapros/getproductbybrandid",
  async function (params: ProductFilterParams) {
    try {
      let url = `api/products?BrandId=${params.id}`
      const { data } = await axiosRequest.get(url);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getproductbycategoryid = createAsyncThunk(
  "zapros/getproductbycategoryid",
  async function (params: ProductFilterParams) {
    try {
      let url = `api/products?CategoryId=${params.id}`
      const { data } = await axiosRequest.get(url);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getproductbyname1 = createAsyncThunk(
  "zapros/getproductbyname1",
  async function (params: ProductByNameParams, { rejectWithValue }) {
    try {
      let url = `api/products?Name=${params.Name}`
      const { data } = await axiosRequest.get(url);
      return data;
    } catch (error) {
      const err = error as any;
      console.error("Error fetching products:", err);
      return rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

export const getsearchprodusct = createAsyncThunk(
  "zapros/getsearchprodusct",
  async function (search: string) {
    try {
      const { data } = await axiosRequest.get(
        `Product/get-products?ProductName=${search}`
      );
      return data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
