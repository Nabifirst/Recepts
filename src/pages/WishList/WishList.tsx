import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ToastContainer } from 'react-toastify';
import { Navigation } from 'swiper/modules';

interface Product {
  id: string;
  name: string;
  description: string;
  images: { fileName: string }[];
  rating: number;
  quantity: number;
}

const Wishlist: React.FC = () => {
  const [likedItems, setLikedItems] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('likedItems') || '[]') as Product[];
    setLikedItems(items);
  }, []);

  const handleProductClick = (productId: string) => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      navigate(`/ProductInfo/:${productId}`);
    });
  };


  const handleRemoveFromLiked = (product: Product) => {
    const updatedItems = likedItems.filter(item => item.id !== product.id);
    localStorage.setItem('likedItems', JSON.stringify(updatedItems));
    setLikedItems(updatedItems);
  };

  return (
    <div className="header-container">
      <div className="pt-[40px] pb-[20px]">
        <div className="liked-products-container">
          <div className="flex pb-[50px] items-center gap-[15px] justify-center">
            <div>
              <p className="text-center text-[55px] font-semibold">Wishlist</p>
            </div>
            <div className="relative top-[5px] sm:flex md:hidden">
              <FavoriteBorderIcon fontSize="large" />
            </div>
          </div>
          {likedItems.length === 0 ? (
            <div className="flex justify-center">
              <div>
                <div className="flex justify-center sm:hidden md:flex pb-[30px]">
                  <FavoriteBorderIcon fontSize="large" />
                </div>
                <p className="sm:text-[18px] md:text-[25px] text-gray-800 pb-[20px] text-center font-semibold">
                  Looks like you don’t have anything saved
                </p>
                <p className="sm:text-[14px] md:text-[17px] text-center text-gray-600 pb-[25px] font-semibold">
                  Sign in to sync your Saved Items across all your devices.
                </p>
                <div onClick={() => navigate('/')} className="flex justify-center cursor-pointer">
                  <p className="p-[10px] w-[180px] text-center bg-gray-800 text-white">Home</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-4 pl-[8px] pr-[8px]">
              {likedItems.map((product) => (
                <div
                  key={product.id}
                  className="product-card p-[4px]"
                  style={{
                    height: "auto",
                    width: "100%",
                    maxWidth: "250px",
                  }}
                >
                  <div className="relative">
                    <Swiper modules={[Navigation]} className="w-[250px] mt-[10px]">
                      {product.images
                        .filter((elem) => !elem.fileName.includes('mp4'))
                        .map((file) => (
                          <SwiperSlide
                            key={file.fileName}
                            className="flex rounded-[10px] justify-center relative"
                          >
                            <img
                              style={{
                                width: "80%",
                                borderRadius: "10px",
                                height: "200px",
                              }}
                              src={`${import.meta.env.VITE_APP_FILES_URL}${file.fileName}`}
                              alt={product.name}
                              onClick={() => handleProductClick(product.id)}
                            />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                  <div className="mt-2 text-start">
                    <h1 className="text-[14px] font-semibold">
                      {product.name.length > 20 ? product.name.slice(0, 15) + "..." : product.name}
                    </h1>
                  </div>
                  <div className="mt-2 text-start">
                    <Box sx={{ "& > legend": { mt: 2 } }}>
                      <Rating name="simple-controlled" value={5} readOnly />
                    </Box>
                  </div>
                  <div className="flex items-center">
                    <h1 className=' h-[50px]'>
                      {product.description.length > 20
                        ? product.description.slice(0, 38) + "..."
                        : product.description}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-gray-500 text-sm text-start">Sold: {product.quantity}</h1>
                    <div className="border mt-[5px] bg-gray-300 border-gray-300 rounded-md w-full">
                      <div className="bg-black h-[3px] rounded-md w-[25%]"></div>
                    </div>
                  </div>
                  <div className="flex items-center w-[100%] gap-[5px]">
                    <div
                      onClick={() => handleProductClick(product.id)}
                      className="mt-2 bg-[#a73afd] w-[100%] flex justify-center gap-[5px] items-center rounded-[12px] text-white text-[16px] font-bold h-[35px]"
                    >
                      <button className="ml-[15px]">More</button>
                      <MoreHorizIcon className="relative top-[2.5px]" fontSize="medium" />
                    </div>
                    <div onClick={() => handleRemoveFromLiked(product)} className="sm:flex mt-[8px]">
                      <Button
                        variant="outlined"
                        sx={{
                          width: '35px',
                          minWidth: '10px',
                          padding: 0,
                          height: '33px',
                          borderRadius: '15px',
                          bgcolor: '#ddd6fe',
                        }}
                      >
                        <DeleteIcon sx={{ width: '20px', color: "red" }} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Wishlist;
