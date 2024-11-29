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

interface AddProductModalProps {
  openAdd: boolean;
  handleCloseAdd: () => void;
  img1: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  form1: string | number;
  form2: string;
  form3: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | number> | any) => void;
  datasubcategory: Category[] | null;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  openAdd,
  handleCloseAdd,
  img1,
  handleSubmit,
  form1,
  form2,
  form3,
  handleChange,
  datasubcategory,
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
      open={openAdd}
      onClose={handleCloseAdd}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <div className="flex items-center pb-[20px] justify-between">
          <Typography id="modal-title" variant="h6" component="h2">
            Add Product
          </Typography>
          <img
            className="w-[20px] cursor-pointer"
            src={img1}
            alt="Close"
            onClick={handleCloseAdd}
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
          <div className="flex gap-[50px] justify-center mt-4">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button variant="contained" color="success" onClick={handleCloseAdd}>
              Close
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
