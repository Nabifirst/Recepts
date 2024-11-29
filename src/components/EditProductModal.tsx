import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";


interface Category {
  id: number;
  name: string;
}

interface EditProductModalProps {
  openEdit: boolean;
  handleCloseEdit: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  form1: string | number;
  form2: string;
  form3: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | number > | any) => void;
  datasubcategory: Category[] | null;
  img1: string;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  openEdit,
  handleCloseEdit,
  handleSubmit,
  form1,
  form2,
  form3,
  handleChange,
  datasubcategory,
  img1,
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
      open={openEdit}
      onClose={handleCloseEdit}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <div className="flex pb-[20px] items-center w-[440px] justify-between">
          <Typography variant="h6" component="h2" className="text-black">
            Edit Product
          </Typography>
          <img
            onClick={handleCloseEdit}
            className="w-[15px] cursor-pointer"
            src={img1}
            alt="Close"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="CategoryId"
                name="CategoryId"
                value={form1}
                onChange={handleChange}
              >
                {datasubcategory?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="Name"
              value={form2}
              onChange={handleChange}
              label="Name"
              fullWidth
            />
            <TextField
              name="Description"
              value={form3}
              onChange={handleChange}
              label="Description"
              multiline
              rows={3}
              fullWidth
              sx={{ gridColumn: "span 2" }}
            />
          </div>
          <div className="flex justify-center gap-[50px] mt-4">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button color="error" variant="contained" onClick={handleCloseEdit}>
              Close
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
