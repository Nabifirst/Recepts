import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";


interface DeleteImageModalProps {
  open: boolean;
  imageUrl?: string;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteImageModal: React.FC<DeleteImageModalProps> = ({ open, imageUrl, onDelete, onClose }) => {
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
          Do you want to delete this image?
        </Typography>
        <div className="flex justify-center mt-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="To be deleted"
              style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "4px" }}
            />
          ) : (
            <Typography variant="body1" color="text.secondary">
              No image available.
            </Typography>
          )}
        </div>
        <div className="flex justify-around mt-4">
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={onClose}>
            No
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteImageModal;
