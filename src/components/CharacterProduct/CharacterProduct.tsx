import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import {
  getattributes,
  getattributesvalue,
  addAttributeValue,
  addAttribute,
  deleteattributes,
  deleteattributesvalue,
} from "../../requests/requests";
import { RootState } from "../../store/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface Attribute {
  id: number;
  name: string;
  isVisible: boolean;
  categoryId?: number;
}

interface AttributeValue {
  id: number;
  name: string;
  isVisible: boolean;
  attributeId: number;
}

interface SubCategory {
  id: number;
  name: string;
}

interface InputField {
  name: string;
}

const CharacterProduct: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

  const data = useSelector((store: RootState) => store.redus.attributes) as Attribute[];
  const data1 = useSelector((store: RootState) => store.redus.attributesValue) as AttributeValue[];
  const getAllSubCategory = useSelector(
    (store: RootState) => store.redus.AllSubCategory
  ) as SubCategory[];

  const [inputFields, setInputFields] = useState<InputField[]>([]);
  const [newAttributeName, setNewAttributeName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    dispatch(getattributes());
    dispatch(getattributesvalue());
  }, [dispatch]);

  const handleAddInput = () => {
    setInputFields([...inputFields, { name: "" }]);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputFields = [...inputFields];
    newInputFields[index].name = event.target.value;
    setInputFields(newInputFields);
  };

  const handleSaveInput = (index: number, attributeId: number) => {
    const inputField = inputFields[index];
    const newAttributeValue = {
      name: inputField.name,
      isVisible: true,
      attributeId,
    };
    dispatch(addAttributeValue(newAttributeValue));
  };

  const handleAddAttribute = () => {
    if (newAttributeName && selectedCategory) {
      const newAttribute = {
        name: newAttributeName,
        isVisible: true,
        categoryId: Number(selectedCategory),
      };
      dispatch(addAttribute(newAttribute))
        .then(() => {
          dispatch(getattributes());
          setNewAttributeName("");
          setSelectedCategory("");
        })
        .catch((error) => {
          alert("Error adding attribute: " + error.message);
        });
    } else {
      alert("Please enter an attribute name and select a category.");
    }
  };

  return (
    <div className="ml-[250px] w-[100%] p-[30px]">
      <div className="flex items-center">
        <TextField
          label="Добавить Атрибут"
          variant="outlined"
          sx={{ height: "40px" }}
          size="medium"
          style={{ marginRight: 10 }}
          value={newAttributeName}
          onChange={(e) => setNewAttributeName(e.target.value)}
        />
        <FormControl
          fullWidth
          variant="outlined"
          className="h-[47px] w-[30px]"
          sx={{ width: "190px" }}
          margin="normal"
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            sx={{ height: "60px", width: "180px" }}
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            {getAllSubCategory?.map((elem) => (
              <MenuItem key={elem.id} value={elem.id}>
                {elem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton color="primary" onClick={handleAddAttribute}>
          <AddIcon />
        </IconButton>
      </div>
      <div className="mt-[20px]">
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <Accordion sx={{ width: "450px" }} key={item.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${item.id}-content`}
                id={`panel${item.id}-header`}
              >
                <Typography>{item.name}</Typography>
                <IconButton
                  color="error"
                  onClick={() => dispatch(deleteattributes(item.id))}
                  style={{ marginLeft: "auto" }}
                >
                  <DeleteIcon />
                </IconButton>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-wrap w-[100%] pb-[20px] gap-[20px]">
                  {data1 &&
                    data1
                      .filter((elem) => elem.attributeId === item.id)
                      .map((elem) => (
                        <Grid className="flex" spacing={2} key={elem.id}>
                          <Grid item xs={4}>
                            <TextField
                              label="Тип отвала"
                              variant="outlined"
                              fullWidth
                              size="small"
                              value={elem.name}
                              InputProps={{
                                endAdornment: (
                                  <div className="flex items-center">
                                    <IconButton
                                      color="error"
                                      onClick={() =>
                                        dispatch(deleteattributesvalue(elem.id))
                                      }
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                    <IconButton color="primary">
                                      <SaveIcon />
                                    </IconButton>
                                  </div>
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                      ))}
                </div>
                {inputFields.map((field, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={8.8}>
                      <TextField
                        label="Новое значение"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={field.name}
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(index, event)
                        }
                        InputProps={{
                          endAdornment: (
                            <div className="flex items-center">
                              <IconButton
                                color="error"
                                onClick={() => {
                                  const newFields = inputFields.filter(
                                    (_, i) => i !== index
                                  );
                                  setInputFields(newFields);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                              <IconButton
                                color="primary"
                                onClick={() => handleSaveInput(index, item.id)}
                              >
                                <SaveIcon />
                              </IconButton>
                            </div>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                ))}
                <Grid
                  item
                  sx={{ display: "flex", gap: "10px", marginTop: "20px" }}
                  xs={12}
                >
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddIcon />}
                    onClick={handleAddInput}
                  >
                    Add
                  </Button>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
    </div>
  );
};

export default CharacterProduct;
