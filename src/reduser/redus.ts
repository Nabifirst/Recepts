import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBrands, getbyid, getBySubCategory, getcart, getcategory, getdata, getMoreSubCategories, getproduct, getproductbyalsocategory, getproductbybrandid, getproductbycategoryid, getProductById, getproductbyname, getproductbyname1, getsearchprodusct, getSubCategory } from "../requests/requests";


interface RedusState {
  data: any[];
  databyid: any;
  dataproduct: any[];
  datacart: any[];
  MoreSubCategories: any[];
  inpreg: string;
  inpreg1: string;
  datasearch: any[];
  searchinp: string;
  BySubCategory: any[];
  productByName: any[];
  productByName1: any[];
  alsoCategoryId: any[];
  ProductByCategoryId: any[];
  AllCategory: any[];
  AllBrands: any[];
  AllSubCategory: any[];
  BrandById: any[];
  ProductById: any[];
}

const initialState: RedusState = {
  data: [],
  databyid: [],
  dataproduct: [],
  datacart: [],
  MoreSubCategories: [],
  inpreg: "",
  inpreg1: "",
  datasearch: [],
  searchinp: "",
  BySubCategory: [],
  productByName: [],
  productByName1: [],
  alsoCategoryId: [],
  ProductByCategoryId: [],
  AllCategory: [],
  AllBrands: [],
  AllSubCategory: [],
  BrandById: [],
  ProductById: [],
};

const redus = createSlice({
  name: "redus",
  initialState,
  reducers: {
    handleChange: (
      state,
      action: PayloadAction<{ type: keyof RedusState; settype: any }>
    ) => {
      state[action.payload.type] = action.payload.settype;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getdata.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getMoreSubCategories.fulfilled, (state, action) => {
      state.MoreSubCategories = action.payload;
    });
    builder.addCase(getproductbyalsocategory.fulfilled, (state, action) => {
      state.alsoCategoryId = action.payload;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.ProductById = action.payload;
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.AllBrands = action.payload;
    });
    builder.addCase(getproductbyname.fulfilled, (state, action) => {
      state.productByName = action.payload;
    });
    builder.addCase(getBySubCategory.fulfilled, (state, action) => {
      state.BySubCategory = action.payload;
    });
    builder.addCase(getproductbyname1.fulfilled, (state, action) => {
      state.productByName1 = action.payload;
    });
    builder.addCase(getSubCategory.fulfilled, (state, action) => {
      state.AllSubCategory = action.payload;
    });
    builder.addCase(getcategory.fulfilled, (state, action) => {
      state.AllCategory = action.payload;
    });
    builder.addCase(getbyid.fulfilled, (state, action) => {
      state.databyid = action.payload;
    });
    builder.addCase(getproduct.fulfilled, (state, action) => {
      state.dataproduct = action.payload;
    });
    builder.addCase(getproductbycategoryid.fulfilled, (state, action) => {
      state.ProductByCategoryId = action.payload;
    });
    builder.addCase(getproductbybrandid.fulfilled, (state, action) => {
      state.BrandById = action.payload;
    });
    builder.addCase(getcart.fulfilled, (state, action) => {
      state.datacart = action.payload;
    });
    builder.addCase(getsearchprodusct.fulfilled, (state, action) => {
      state.datasearch = action.payload;
    });
  },
});

export const { handleChange } = redus.actions;
export default redus.reducer;
