import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";
import { AppDispatch } from "../store/store";

interface ApiResponse<T> {
  data: T;
}

interface ReviewObject {
  productId: number;
  name:string;
  raiting: number;
  content: string;
}

interface Category {
  id: number;
  name: string;
}

interface delProduct {
  id:string
}

interface UpdateAtributValues{
  success: boolean;
}

interface EditAtributValues{
  id:number;
  value:string;
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

interface ProductForm {
  id: string;
  Name: string;
  Code: string;
  Quantity: number;
  Description: string;
  Price: number;
  HasDiscount: boolean;
  DiscountPrice: number;
  BrandId: string;
  CategoryId: string;
  images?: File[];
}



interface AddProductResponse {
  id: string;
  name: string;
}

interface RegisterResponse {
  token: string;
}

interface LoginResponse {
  token: string;
}

export const getdata = createAsyncThunk<Category[]>(
  "requests/getdata",
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

export const getBySubCategory = createAsyncThunk<Product[], number>(
  "requests/getBySubCategory",
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

export const getattributes = createAsyncThunk(
  "requests/getattributes",
  async function () {
    try {
      const { data } = await axiosRequest.get("api/attributes");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getattributesvalue = createAsyncThunk(
  "requests/getattributesvalue",
  async function () {
    try {
      const { data } = await axiosRequest.get("api/attribute-values");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSubCategory = createAsyncThunk<SubCategory[]>(
  "requests/getSubCategory",
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

export const getMoreSubCategories = createAsyncThunk<SubCategory[]>(
  "requests/getMoreSubCategories",
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

export const delProduct = createAsyncThunk(
  "requests/delProduct",
  async function (id:delProduct, { dispatch }) {
    try {
      await axiosRequest.delete(`api/products/${id}`);
      dispatch(getproduct());
    } catch (error) {
      console.log(error);
    }
  }
);


export const getBrands = createAsyncThunk<any>(
  "requests/getBrands",
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

export const getproductbyid = createAsyncThunk<Product, number>(
  "requests/getproductbyid",
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

export const getproductbyname = createAsyncThunk<Product[], string>(
  "requests/getproductbyname",
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



export const getcart = createAsyncThunk<CartProduct[]>(
  "requests/getcart",
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

export const postcart = createAsyncThunk<void, number>(
  "requests/postcart",
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

export const inccart = createAsyncThunk<void, number>(
  "requests/inccart",
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

export const redcart = createAsyncThunk<void, number>(
  "requests/redcart",
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

export const addAttributeValue = createAsyncThunk(
  "attributes/addAttributeValue",
  async (attributeValue:any,{dispatch}) => {
    try {
      await axiosRequest.post("api/attribute-values",attributeValue);
       dispatch(getattributes())
    } catch (error) {
      
    }
  }
);

export const addAttribute = createAsyncThunk(
  "attributes/addAttribute",
  async (addAttribute:any, { dispatch }) => {
    try {
      await axiosRequest.post("api/attributes",addAttribute)
      dispatch(getattributes())
    } catch (error) {

    }
  }
);

export const deleteattributes = createAsyncThunk(
  "requests/deleteattributes",
  async function (id:number, { dispatch }) {
    try {
     await axiosRequest.delete(`api/attributes/${id}`);
      dispatch(getattributes());
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteattributesvalue = createAsyncThunk(
  "requests/deleteattributesvalue",
  async function (id:number, { dispatch }) {
    try {
      await axiosRequest.delete(`api/attribute-values/${id}`);
      dispatch(getattributes());
    } catch (error) {
      console.log(error);
    }
  }
);

export const postreview = createAsyncThunk(
  "requests/postreview",
  async (obj: ReviewObject, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.post(`api/product-reviews`, obj);
      return data; 
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const register = createAsyncThunk<RegisterResponse, { firstName: string;phoneNumber:string;password:string;confirmPassword:string; lastName: string }>(
  "requests/register",
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

export const login = createAsyncThunk<LoginResponse, { phoneNumber: string; password: string }>(
  "requests/login",
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

export const delcart = createAsyncThunk<void, number>(
  "requests/delcart",
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



export const getProductById = createAsyncThunk(
  "requests/getProductById",
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
  "requests/getbyid",
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
  "requests/getcategory",
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
  "requests/getproduct",
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


export const addproduct = createAsyncThunk<AddProductResponse,ProductForm, { dispatch: AppDispatch }>(
  "requests/addproduct",
  async function (form, { dispatch }) {
    const formData = new FormData();

    formData.append("BrandId", "3");
    formData.append("DiscountPrice", "3");
    formData.append("Price", "3");
    formData.append("Quantity", "30");
    formData.append("Name", form.Name);
    formData.append("Code", Math.random().toString());
    formData.append("CategoryId", form.CategoryId);
    formData.append("HasDiscount", "true");
    formData.append("Description", form.Description);

    if (form.images) {
      form.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      const { data } = await axiosRequest.post<AddProductResponse>("api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(getproduct());

      return data;
    } catch (error: any) {
      console.error("Error adding product:", error.message);
      throw error;
    }
  }
);

export const getatributsbyproductid = createAsyncThunk(
  "requests/getatributsbyproductid",
  async function (id:number) {
    try {
      const { data } = await axiosRequest.get(`api/products/with-attributes/${id}`);
      return data.data;
    } catch (error) {
      console.error("Error fetching attributes:", error);
    }
  }
);


export const editatributsbyproductid = createAsyncThunk<UpdateAtributValues, EditAtributValues>(
  "requests/editatributsbyproductid",
  async function ({ id, value }) {
    try {
      await axiosRequest.put(
        `api/products/attribute-values/${id}`,
        {
          value: value,
          isVisible: true,
        }
      );
      
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false }; 
    }
  }
);

export const eddproduct = createAsyncThunk(
  "requests/eddproduct",
  async (form: ProductForm, { dispatch }) => {
    const formData = new FormData();
    formData.append("Name", form.Name);
    formData.append("Code", form.Code);
    formData.append("Quantity", form.Quantity.toString());
    formData.append("Description", form.Description);
    formData.append("Price", form.Price.toString());
    formData.append("HasDiscount", form.HasDiscount.toString());
    if (form.DiscountPrice) {
      formData.append("DiscountPrice", form.DiscountPrice.toString());
    }
    formData.append("BrandId", form.BrandId);
    formData.append("CategoryId", form.CategoryId);

    if (form.images && form.images.length > 0) {
      form.images.forEach((image) => {
        formData.append("Images", image);
      });
    }

    try {
      const { data } = await axiosRequest.put(
        `api/products/${form.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(getproduct() as AppDispatch);
      return data;
    } catch (error: any) {
      console.error("Error updating product:", error);
      throw error.response?.data || error.message;
    }
  }
);

export const addImageToProduct = createAsyncThunk(
  "requests/addImageToProduct",
  async (formData:any, { dispatch }) => {
    try {
      await axiosRequest.post(
        "api/products/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(getproduct());
    } catch (error) {
    }
  }
);


export const delImageById = createAsyncThunk(
  "requests/delImageById",
  async function (id:number, { dispatch }) {
    try {
      await axiosRequest.delete(`api/products/images/${id}`);
      dispatch(getproduct());
    } catch (error) {
      console.log(error);
    }
  }
);

export const getproductbyalsocategory = createAsyncThunk(
  "requests/getproductbyalsocategory",
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
  "requests/getproductbybrandid",
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
  "requests/getproductbycategoryid",
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
  "requests/getproductbyname1",
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
  "requests/getsearchprodusct",
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
