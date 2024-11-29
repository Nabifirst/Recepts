import  { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

import {
  addImageToProduct,
  addproduct,
  delImageById,
  delProduct,
  eddproduct,
  getproduct,
  getSubCategory,
  getatributsbyproductid,
  editatributsbyproductid,
} from "../../requests/requests";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Swiper, SwiperSlide } from "swiper/react";

import img1 from "../../pages/ProductInfo/Transparent_X (2).png";
import DeleteImageModal from "../DeleteImageModal";
import AddImageModal from "../AddImageModal";
import EditProductModal from "../EditProductModal";
import AddProductModal from "../AddProductModal";
import CharacteristicModal from "../CharacteristicModal";
import { Pagination } from "swiper/modules";

function PostRecept() {
  const dispatch = useDispatch();
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [setting, setSetting] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openAddImage, setOpenAddImage] = useState<boolean>(false);
  const [openDeleteImage, setOpenDeleteImage] = useState<boolean>(false);
  const [deleteImage, setDeleteImage] = useState<string | null>(null);
  const [idImage, setIdImage] = useState<number | null>(null);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [form, setForm] = useState<any>({
    id: "",
    Name: "",
    CategoryId: "",
    Description: "",
    images: [],
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const datasubcategory = useSelector((store: any) => store.redus.AllSubCategory);
  const dataproduct = useSelector((store: any) => store.redus.dataproduct);
  const getatributbyproduct = useSelector((store: any) => store.redus.getatributbyproduct);

  const [id1, setId1] = useState<number | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, any>>({});

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleCloseSetting = () => setSetting(false);

  const handleOpenAddImage = (product: any) => {
    setCurrentProduct(product);
    setOpenAddImage(true);
  };

  const handleCloseAddImage = () => {
    setCurrentProduct(null);
    setSelectedFiles([]);
    setOpenAddImage(false);
  };

  const handleOpenDeleteImage = (image: any) => {
    setDeleteImage(image.fileName);
    setOpenDeleteImage(true);
    setIdImage(image.id);
  };

  const handleCloseDeleteImage = () => setOpenDeleteImage(false);

  const handleOpenEdit = (product: any) => {
    setCurrentProduct(product);
    setForm({
      id: product.id,
      BrandId: product.brandId,
      DiscountPrice: product.discountPrice,
      Price: product.price,
      Quantity: product.quantity,
      Name: product.name,
      Code: product.code,
      CategoryId: product.categoryId,
      HasDiscount: product.hasDiscount,
      Description: product.description,
      images: [],
    });
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setCurrentProduct(null);
    setForm({
      id: "",
      Name: "",
      CategoryId: "",
      Description: "",
      images: [],
    });
    setOpenEdit(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | any) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm: any) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setSelectedFiles(files ? Array.from(files) : []);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentProduct) {
      dispatch(eddproduct(form) as any);
      handleCloseEdit();
    } else {
      dispatch(addproduct(form) as any);
      handleCloseAdd();
    }
  };

  const handleAddImageSubmit = () => {
    const formData = new FormData();
    if (currentProduct) {
      formData.append("ProductId", currentProduct.id.toString());
      selectedFiles.forEach((file) => {
        formData.append("Files", file);
      });
      dispatch(addImageToProduct(formData) as any);
      handleCloseAddImage();
    }
  };

  const handlegetatributproduct = (id: number) => {
    dispatch(getatributsbyproductid(id) as any);
    setId1(id);
    setSetting(true);
  };

  const handleInputChange = (id: string, value: any) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    dispatch(getproduct() as any);
    dispatch(getSubCategory() as any);
  }, [dispatch]);

  return (
    <div className="w-[100%] p-[30px]">
      <section className="mx-auto">
        <div className="flex justify-end my-[1%] gap-5 items-center">
          <button onClick={handleOpenAdd}>
            <AddIcon sx={{ fontSize: "40px" }} />
          </button>
        </div>

        <CharacteristicModal
          setting={setting}
          handleCloseSetting={handleCloseSetting}
          getatributbyproduct={getatributbyproduct}
          handleInputChange={handleInputChange as any}
          inputValues={inputValues}
          dispatch={dispatch}
          editatributsbyproductid={editatributsbyproductid}
          setSetting={setSetting}
          id1={id1}
          getatributsbyproductid={getatributsbyproductid}
        />

        <AddProductModal
          openAdd={openAdd}
          handleCloseAdd={handleCloseAdd}
          img1={img1}
          handleSubmit={handleSubmit}
          form1={form.CategoryId}
          form2={form.Name}
          form3={form.Description}
          handleChange={handleChange}
          datasubcategory={datasubcategory}
        />

        <EditProductModal
          openEdit={openEdit}
          handleCloseEdit={handleCloseEdit}
          img1={img1}
          handleSubmit={handleSubmit}
          form1={form.CategoryId}
          handleChange={handleChange}
          form2={form.Name}
          form3={form.Description}
          datasubcategory={datasubcategory}
        />

        <DeleteImageModal
          open={openDeleteImage}
          imageUrl={`${import.meta.env.VITE_APP_FILES_URL}${deleteImage}`}
          onDelete={() => {
            if (idImage) {
              dispatch(delImageById(idImage)as any);
            }
            handleCloseDeleteImage();
          }}
          onClose={handleCloseDeleteImage}
        />

        <AddImageModal
          open={openAddImage}
          onClose={handleCloseAddImage}
          handleFileChange={handleFileChange}
          selectedFiles={selectedFiles}
          onDelete={handleAddImageSubmit}
        />

        <div className="grid gap-10 items-center grid-cols-4">
          {dataproduct?.map((el: any) => (
            <div
              key={el.id}
              className="flex flex-col border-[1px] p-[10px] rounded-[10px] shadow-lg items-center gap-2"
            >
              {el?.images?.length > 1 ? (
                <Swiper
  modules={[Pagination]}
  pagination={{ clickable: true }}
  spaceBetween={10}
  slidesPerView={1}
  className="w-[250px]"
>
  {el.images.map((elem: any) => (
    <SwiperSlide key={elem.fileName}>
      <img
        style={{ height: "230px" }}
        onClick={() => handleOpenDeleteImage(elem)}
        className="w-full h-[230px]"
        src={`${import.meta.env.VITE_APP_FILES_URL}${elem.fileName}`}
        alt=""
      />
    </SwiperSlide>
  ))}
</Swiper>

              ) : (
                el?.images?.map((elem: any) => (
                  <img
                    key={elem.fileName}
                    style={{ height: "230px" }}
                    onClick={() => handleOpenDeleteImage(elem)}
                    className="w-[100%] h-[40]"
                    src={`${import.meta.env.VITE_APP_FILES_URL}${elem.fileName}`}
                    alt=""
                  />
                ))
              )}
              <div className="flex gap-1">
                <p>{el?.id}</p>
                <h1>{el?.name}</h1>
              </div>
              <div className="flex items-center gap-[10px]">
                <button onClick={() => dispatch(delProduct(el.id) as any)}>
                  <DeleteOutlineTwoToneIcon />
                </button>
                <button onClick={() => handleOpenEdit(el)}>
                  <EditOutlinedIcon sx={{ fontSize: "30px" }} />
                </button>
                <button onClick={() => handleOpenAddImage(el)}>
                  <AddIcon sx={{ fontSize: "30px" }} />
                </button>
                <button onClick={() => handlegetatributproduct(el.id)}>
                  <SettingsSuggestIcon sx={{ fontSize: "30px" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PostRecept;
