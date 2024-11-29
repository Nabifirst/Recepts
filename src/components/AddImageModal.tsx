import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";


interface AddImageModalProps {
  open: boolean;
  onClose: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFiles: File[];
  onDelete: () => void;
}

const AddImageModal: React.FC<AddImageModalProps> = ({
  open,
  onClose,
  handleFileChange,
  selectedFiles,
  onDelete,
}) => {
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography textAlign="center" id="modal-title" variant="h6" component="h2">
          Do you want to add the image?
        </Typography>
        <div className="flex justify-center pt-4 pb-4">
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <Swiper spaceBetween={10} className="w-[250px]" slidesPerView={1}>
          {selectedFiles.map((file, index) => (
            <SwiperSlide key={index}>
              <img
                className="w-full h-auto"
                src={URL.createObjectURL(file)}
                alt={`Selected ${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-around mt-4">
          <Button variant="contained" color="primary" onClick={onDelete}>
            Yes
          </Button>
          <Button variant="contained" color="error" onClick={onClose}>
            No
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddImageModal;
