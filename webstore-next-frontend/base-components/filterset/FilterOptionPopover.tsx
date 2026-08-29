"use client"
import { useAppTranslation } from '@/service/customHooks/useAppTranslation';
import { AddRecIcon, CancelIcon, ConfirmIcon, RemoveRecIcon } from '@/service/svgIconUtils';
import { CONDITIONAL_TYPE } from '@/types/conditionalType';
import { DataType } from '@/types/enum';
import { Box, Button, Fade, FormControl, IconButton, InputLabel, MenuItem, Popover, Select, SelectChangeEvent, TextField, Tooltip, Typography } from '@mui/material'
import React, { ChangeEvent } from 'react'

interface FilterProps {
  options: FilterOption[];
  filterList: Filter[];
  setFilterList: React.Dispatch<React.SetStateAction<Filter[]>>;
  anchor: HTMLButtonElement | null;
  open: boolean;
  close: () => void;
  Filter4Products(filters: Filter[]): Promise<void>
}

export default function FilterOptionPopover({ options, filterList, setFilterList, anchor, open, close, Filter4Products }: FilterProps) {
  const { filtering } = useAppTranslation()

  const initialFilterList: Filter[] = filterList.length == 0 ? 
  [{
    itemid: 1,
    caption: options[0].caption,
    fieldname: options[0].fieldname,
    datatype: options[0].datatype,
    condition: CONDITIONAL_TYPE.get(options[0].datatype)?.at(0)?.value ?? "filterCondition.eq",
    value: "",
    value2: "0"
  }]
  : filterList;

  const [filterList2render, setFilterList2render] = React.useState<Filter[]>( initialFilterList )

  const getTextField = (itemId: number, datatype: DataType, condition: string, value: string | number, value2: string | number) => {
    const fieldStyle = {
      "& .MuiInputBase-root": { height: 45 },
      "& .MuiInputLabel-root": { top: -5 },
      "& .MuiInputLabel-shrink": { top: 0 /* onFocus */ },
    }
    const disableTransform = {
      InputLabelProps: { shrink: true }
    }
    const isBetween = (condition === "bt");
    return (
      <>
        {
          isBetween
            ? <Box display={"flex"}>
              <TextField label="Match with" onChange={(event) => onchangeValue(event, itemId)} value={value} type={datatype} sx={{ ...fieldStyle, width: "49%", mr: 1 }} {...disableTransform} />
              <TextField label="Match with" onChange={(event) => onchangeValue2(event, itemId)} value={value2} type={datatype} sx={{ ...fieldStyle, width: "50%" }} {...disableTransform} />
            </Box>
            : <TextField label="Match with" onChange={(event) => onchangeValue(event, itemId)} value={value} type={datatype} sx={fieldStyle} {...disableTransform} fullWidth />
        }
      </>
    )
  }

  const renderFilterOptions = (filterList : Filter[]) => {
    return (
      filterList2render?.map((filter, index) => (
            <Box key={filter.itemid} sx={{ display: "flex", alignItems: "center", my: 3 }} >
              <Box sx={{ minWidth: "30%", mr: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id={`filterby-label${filter.itemid}`}>{filtering("by")}</InputLabel>
                  <Select sx={{ height: 45 }}
                    labelId={`filterby-select-label${filter.itemid}`}
                    id={`filterby-select${filter.itemid}`}
                    value={filter.fieldname}
                    label={filtering("by")} readOnly={filterList?.length > index + 1}
                    onChange={(event) => onchangeFieldName(event, filter.itemid)}
                  >
                    {
                      options
                        ?.filter(option => !filterList.some(f => f.fieldname === option.fieldname && f.itemid !== filter.itemid)) // remove (AlreadySelectedFieldname && NotSameAsCurrentItemid)
                        ?.map(option => (
                          <MenuItem key={option.optionid} value={option.fieldname}>{option.caption}</MenuItem>
                        ))
                    }
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: "25%", mr: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id={`condition-label${filter.itemid}`}>{filtering("condition")}</InputLabel>
                  <Select sx={{ height: 45 }}
                    labelId={`condition-select-label${filter.itemid}`}
                    id={`condition-select${filter.itemid}`}
                    value={filter.condition}
                    label={filtering("condition")}
                    onChange={(event) => onchangeCondition(event, filter.itemid)}
                  >
                    {
                      CONDITIONAL_TYPE?.get(filter.datatype)?.map(condition => (
                        <MenuItem value={condition.value}>{filtering(condition.label)}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: "30%", mr: 1 }}>
                {getTextField(filter.itemid, filter.datatype, filter.condition, filter.value, filter.value2)}
              </Box>
              <Tooltip title={<Typography sx={{ fontSize: '14px' }}>{filtering("add")}</Typography>} placement="top" >
                <IconButton size="large" color="inherit" onClick={newFilterSlot}
                  sx={{ p: 0, mx: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}>
                  <AddRecIcon width={30} height={30} />
                </IconButton>
              </Tooltip>
              <Tooltip title={<Typography sx={{ fontSize: '14px' }}>{filtering("remove")}</Typography>} placement="top" >
                <IconButton size="large" color="inherit" onClick={() => removeFilterSlot(filter.itemid)}
                  sx={{ p: 0, mx: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }}>
                  <RemoveRecIcon width={30} height={30} />
                </IconButton>
              </Tooltip>
            </Box>
          ))
    )
  }

  const onchangeFieldName = (event: SelectChangeEvent, id: number) => {
    let opt = options.find(option => option.fieldname === event.target.value);
    if (opt) {
      setFilterList2render((prev) =>
        prev.map(filter => filter.itemid == id
          ? {
            ...filter,
            itemid: parseInt(opt.optionid),
            caption: opt.caption,
            fieldname: opt.fieldname,
            condition: CONDITIONAL_TYPE.get(opt.datatype)?.at(0)?.value ?? "filterCondition.eq",
            datatype: opt.datatype
          }
          : filter)
      );
    }
  };

  const onchangeCondition = (event: SelectChangeEvent, id: number) => {
    setFilterList2render((prev) =>
      prev.map(filter => filter.itemid == id ? { ...filter, condition: event.target.value } : filter)
    );
  };

  const onchangeValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>, id: number) => {
    setFilterList2render((prev) =>
      prev.map(filter => filter.itemid == id ? { ...filter, value: event.target.value } : filter)
    );
  }

  const onchangeValue2 = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>, id: number) => {
    setFilterList2render((prev) =>
      prev.map(filter => filter.itemid == id ? { ...filter, value2: event.target.value } : filter)
    );
  }

  const newFilterSlot = () => {
    let unused1stOption = options.find(option => !filterList2render.some(f => f.fieldname === option.fieldname));
    if (unused1stOption) {
      let newSlot: Filter =
      {
        itemid: parseInt(unused1stOption.optionid),
        caption: unused1stOption.caption,
        fieldname: unused1stOption.fieldname,
        datatype: unused1stOption.datatype,
        condition: CONDITIONAL_TYPE.get(unused1stOption.datatype)?.at(0)?.value ?? "filterCondition.eq"
      };
      setFilterList2render((prev) => [...(prev || []), newSlot]);
    }
  }

  const removeFilterSlot = (id: number) => {
    if (filterList2render.length > 1) {
      let remainingList = filterList2render.filter(filter => filter.itemid !== id)
      setFilterList2render(remainingList);
    }
  }

  const correctBetweenValue = () => {
    return filterList2render.map(filter => {
        if(filter.condition == "bt" && Number(filter.value) > Number(filter.value2)) {
          return {
            ...filter, 
            value : filter.value2,
            value2 : filter.value 
          }
        }
        return filter
      })
  }

  const setFilter = () => {
    const correctFilters = correctBetweenValue()
    setFilterList(correctFilters)
    Filter4Products(correctFilters)
    close()
  }

  return (
    <Popover
      sx={{ mt: 4 }}
      id={"filteroptions"}
      open={open}
      anchorEl={anchor}
      onClose={close}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >

      <Box sx={{ width: { xs: 500, sm: 650, md: 800, lg: 900 }, maxHeight: 340, px: 2 }}>
        {
          filterList.length > 0 ? 
          renderFilterOptions(filterList) : renderFilterOptions(initialFilterList)
        }
        <Box sx={{ display: "flex", width: "100%", gap: 1, pb: 3 }}
        >
          <Button
            variant="outlined" fullWidth
            onClick={close}
            endIcon={<CancelIcon width={25} height={25} />}
            sx={{ flex: 1, py: 1.2, textTransform: "none", borderRadius: 2 }}
          >
            {filtering("cancel")}
          </Button>

          <Button
            variant="contained" fullWidth
            onClick={setFilter}
            endIcon={<ConfirmIcon width={25} height={25} />}
            sx={{ flex: 1, py: 1.2, textTransform: "none", borderRadius: 2 }}
          >
            {filtering("set")}
          </Button>
        </Box>
      </Box>
    </Popover>
  )
}

