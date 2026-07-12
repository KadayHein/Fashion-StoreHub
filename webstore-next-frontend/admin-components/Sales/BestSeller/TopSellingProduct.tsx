import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import { Divider, Pagination, PaginationItem, Stack } from '@mui/material';
import { DataType } from '@/types/enum';
import FilterOptionPopover from '@/base-components/filterset/FilterOptionPopover';
import { ArrowLeftRounded, ArrowRightRounded } from '@mui/icons-material';
import FilterOptionSetter from '@/base-components/filterset/FilterOptionSetter';
import FilterOptionDetailsList from '@/base-components/filterset/FilterOptionDetailsList';

interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

interface HeadCell {
    id: keyof Data;
    label: string;
    numeric: boolean;
}

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function createData(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): Data {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(2, 'Donut', 452, 25.0, 51, 4.9),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
  createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
  createData(9, 'KitKat', 518, 26.0, 65, 7.0),
  createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
  createData(11, 'Marshmallow', 318, 0, 81, 2.0),
  createData(12, 'Nougat', 360, 19.0, 9, 37.0),
  createData(13, 'Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    label: 'Product Name',
  },
  {
    id: 'calories',
    numeric: true,
    label: 'Order',
  },
  {
    id: 'fat',
    numeric: true,
    label: 'Revenue (Yen)',
  },
  {
    id: 'carbs',
    numeric: true,
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    numeric: true,
    label: 'Protein (g)',
  },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ "& .MuiTableCell-root": { fontSize: "1rem", fontWeight: 700 } }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell 
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  const [filterDataset,setFilterDataset] = React.useState<FilterDataset>();
  const [filterAnchor, setFilterAnchor] = React.useState<HTMLButtonElement | null>(null);
  const openFilter = (event: React.MouseEvent<HTMLButtonElement>) => setFilterAnchor(event.currentTarget);
  const closeFilter = () => setFilterAnchor(null);
  const options : FilterOption[] = 
  [
    { optionid: "1", caption: "Product Name", fieldname : "productname", datatype: DataType.STRING },
    { optionid: "2", caption: "Order", fieldname : "order", datatype: DataType.NUMBER },
    { optionid: "3", caption: "Income", fieldname : "income", datatype: DataType.NUMBER },
    { optionid: "4", caption: "Revenue", fieldname : "revenue", datatype: DataType.NUMBER },
    { optionid: "5", caption: "Updated Date", fieldname : "updateddate", datatype: DataType.DATETIME }
  ]

  return (
    <Toolbar
      sx={{pl: { sm: 2 },pr: { xs: 1, sm: 1 }, display: "flex"}}
    >
        <Typography width={800}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Top Selling Products
        </Typography>
        <FilterOptionDetailsList filterList={filterDataset.filterList}/>
        <Tooltip title="Filter list">
          <IconButton onClick={openFilter}>
            <svg fill="none" height={25} viewBox="0 0 48 48" width={25} xmlns="http://www.w3.org/2000/svg"><g fill="#1575e5"><path d="m9.05118 11.7492c.04676-.8619.60665-1.5264 1.46392-1.6273.5791-.0681 1.3847-.1219 2.4849-.1219s1.9058.0538 2.4849.1219c.8573.1009 1.4172.7654 1.4639 1.6273.0291.5365.0512 1.2675.0512 2.2508s-.0221 1.7143-.0512 2.2508c-.0467.8619-.6066 1.5264-1.4639 1.6273-.5791.0681-1.3847.1219-2.4849.1219s-1.9058-.0538-2.4849-.1219c-.85726-.1009-1.41716-.7654-1.46392-1.6273-.02911-.5365-.05118-1.2675-.05118-2.2508s.02207-1.7143.05118-2.2508z"/><path d="m31.0512 7.74922c.0467-.86192.6066-1.52642 1.4639-1.62729.5791-.06813 1.3847-.12193 2.4849-.12193s1.9058.0538 2.4849.12193c.8573.10087 1.4172.76537 1.4639 1.62729.0291.53652.0512 1.26751.0512 2.25078 0 .9833-.0221 1.7143-.0512 2.2508-.0467.8619-.6066 1.5264-1.4639 1.6273-.5791.0681-1.3847.1219-2.4849.1219s-1.9058-.0538-2.4849-.1219c-.8573-.1009-1.4172-.7654-1.4639-1.6273-.0291-.5365-.0512-1.2675-.0512-2.2508 0-.98327.0221-1.71426.0512-2.25078z"/><path d="m20.0512 3.74922c.0467-.86192.6066-1.52642 1.4639-1.62729.5791-.06813 1.3847-.12193 2.4849-.12193s1.9058.0538 2.4849.12193c.8573.10087 1.4172.76537 1.4639 1.62729.0291.53652.0512 1.26751.0512 2.25078s-.0221 1.71426-.0512 2.25078c-.0467.86192-.6066 1.52642-1.4639 1.62729-.5791.06813-1.3847.12193-2.4849.12193s-1.9058-.0538-2.4849-.12193c-.8573-.10087-1.4172-.76537-1.4639-1.62729-.0291-.53652-.0512-1.26751-.0512-2.25078s.0221-1.71426.0512-2.25078z"/></g><path d="m24 16c-10.4512 0-15.78231.196-18.22305.332-1.0147.0565-1.77695.8946-1.77695 1.9109l.00001 1.9827c-.00001 1.1133.46041 2.174 1.30214 2.9026 2.09507 1.8136 6.58385 5.5273 12.48125 9.437.5103.3383.843.8893.8998 1.4989.4753 5.1049.892 8.6375 1.1236 10.4711.1065.8439.825 1.4648 1.6756 1.4648.3375 0 .6674-.0999.9481-.2871l4.4275-2.9516c.7401-.4934 1.2811-1.2241 1.4534-2.0967.2277-1.1535.5613-3.176.9363-6.5202.0686-.6123.4136-1.1614.9336-1.4921 6.2272-3.9596 10.6288-7.7314 12.6212-9.549.7815-.7129 1.1975-1.7251 1.1975-2.7828v-2.0776c0-1.0163-.7623-1.8544-1.777-1.9109-2.4407-.136-7.7718-.332-18.223-.332z" fill="#a6cfff"/></svg>
          </IconButton>
        </Tooltip>
        <FilterOptionSetter
            options={options} filterDataset={filterDataset} setFilterDataset={setFilterDataset} 
            open={Boolean(filterAnchor)} close={closeFilter}/>
        
        <FilterOptionPopover 
            options={options} filterDataset={filterDataset} setFilterDataset={setFilterDataset} 
            anchor={filterAnchor} open={Boolean(filterAnchor)} close={closeFilter}/>
    </Toolbar>
  );
}
export default function TopSellingProduct() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {

  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Avoid a layout jump on the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }} >
      <Paper sx={{ width: '100%', mb: 2, borderRadius : 5, boxShadow: (theme) => theme.shadows[4]}} >
        <EnhancedTableToolbar />
        <Divider variant="middle" />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} alignItems="center" paddingBlock={5}>
            <Pagination color="secondary" 
            count={totalPages} 
            page={page}
            onChange={handleChangePage}
            renderItem={(item) => (
                <PaginationItem
                  {...item}
                  components={{
                    previous: () => <Typography display="flex" alignItems="center" pr={2}><ArrowLeftRounded fontSize="large"/> <>Prev</></Typography>,
                    next: () => <Typography display="flex" alignItems="center" pl={2}><>Next</> <ArrowRightRounded fontSize="large"/></Typography>,
                  }}
                />
              )} 
            />
        </Stack>
      </Paper>
    </Box>
  );
}