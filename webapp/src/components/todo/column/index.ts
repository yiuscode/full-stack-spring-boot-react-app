import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

export const getColumns = (action: (params: GridRenderCellParams<any>) => JSX.Element): GridColDef[] => [
  { field: 'id', headerName: 'ID', width: 330 },
  { field: 'description', headerName: 'Description', width: 330 },
  { field: 'done', headerName: 'Done?', width: 330, type: 'boolean' },
  {
    field: 'date',
    headerName: 'Target date',
    width: 180,
    valueGetter: (param) => {
      return new Date(param.row.date).toLocaleDateString();
    },
  },
  {
    width: 600,
    field: 'Actions',
    renderCell: action,
  },
];
