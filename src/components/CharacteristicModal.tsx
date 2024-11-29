import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Modal,
    Typography,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import SaveIcon from "@mui/icons-material/Save";
  import { Dispatch } from "react";
  

  interface AttributeValue {
    id: number;
    name?: string;
    value: string;
  }
  
  interface Attribute {
    name?: string;
    attributeValues: { value: AttributeValue }[];
  }
  
  interface CharacteristicModalProps {
    setSetting: (value: boolean) => void;
    id1: number | null;
    getatributsbyproductid: (id: number) => void;
    setting: boolean;
    handleCloseSetting: () => void;
    dispatch: Dispatch<any>;
    editatributsbyproductid: (payload: { id: number; value: string }) => void;
    getatributbyproduct: { attributes: Attribute[] } ;
    handleInputChange: (id: number, value: string) => void;
    inputValues: Record<number, string>;
  }
  
  const CharacteristicModal: React.FC<CharacteristicModalProps> = ({
    setSetting,
    id1,
    getatributsbyproductid,
    setting,
    handleCloseSetting,
    dispatch,
    editatributsbyproductid,
    getatributbyproduct,
    handleInputChange,
    inputValues,
  }) => {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
    };
  
    return (
      <Modal
        open={setting}
        onClose={handleCloseSetting}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Setting Product
          </Typography>
          <div className="mt-[20px]">
            {getatributbyproduct?.attributes?.length as any > 0 ? (
              getatributbyproduct.attributes.map((elem, index)  => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography variant="h6">
                      {elem.name || "Unnamed Attribute"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {elem?.attributeValues?.map((valueElem:any, valueIndex) => (
                      <div
                        className="flex items-center justify-between w-full"
                        key={valueIndex}
                      >
                        <Typography className="p-2" variant="body1">
                          {valueElem.name}
                        </Typography>
                        <div className="flex items-center">
                          <input
                            onClick={() =>
                              console.log("Selected ID:", valueElem.value.id)
                            }
                            onChange={(e) =>
                              handleInputChange(
                                valueElem.value.id,
                                e.target.value
                              )
                            }
                            value={
                              inputValues[valueElem.value.id] !== undefined
                                ? inputValues[valueElem.value.id]
                                : valueElem.value.value
                            }
                            className="border-2 rounded-2xl p-1"
                            type="text"
                          />
                          <Button
                            onClick={() =>
                              dispatch(
                                editatributsbyproductid({
                                  id: valueElem.value.id,
                                  value: inputValues[valueElem.value.id],
                                })
                              )
                            }
                          >
                            <SaveIcon color="primary" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Typography variant="h6">No attributes available</Typography>
            )}
  
            <div className="flex justify-center mt-[30px]">
              <Button
                onClick={() => {
                  if (id1) {
                    dispatch(getatributsbyproductid(id1));
                    setSetting(false);
                  }
                }}
                variant="contained"
                color="success"
                className="mt-[20px]"
              >
                Successfully
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    );
  };
  
  export default CharacteristicModal;
  