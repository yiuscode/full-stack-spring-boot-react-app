import { Box, Button } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useAuth } from '../../context/security';
import useGetTodos from './hooks/useGetTodos';
import useDeleteTodoList from './hooks/useDeleteTodo';
import { getColumns } from './column';
import React from 'react';
import Modal from './modal';
import { Todo } from '../../types';

export const TodoApp = () => {
  const { user } = useAuth();
  const { todos, fetchTodos } = useGetTodos();
  const { response, handleDelete } = useDeleteTodoList();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [formMode, setFormMode] = React.useState<'Edit' | 'Create'>('Create');
  const [initialValues, setInitialValues] = React.useState<Todo>({
    id: '',
    description: '',
    date: Date.now(),
    done: false,
  });
  const handleModalCallBack = () => {
    setModalOpen(false);
    fetchTodos();
  };
  const handleCreateClick = () => {
    setFormMode('Create');
    setModalOpen(true);
  };

  const action = (params: GridRenderCellParams<any>) => {
    const handleUpdateClick = () => {
      setInitialValues(params.row);
      setFormMode('Edit');
      setModalOpen(true);
    };
    const handleDeleteClick = () => {
      handleDelete(user?.id ?? '', params.row.id).then(() => fetchTodos());
    };

    return (
      <>
        <Button sx={{ mr: 1 }} variant="contained" color="info" size="small" onClick={handleUpdateClick}>
          Update
        </Button>
        <Button sx={{ mr: 1 }} variant="contained" color="error" size="small" onClick={handleDeleteClick}>
          Delete
        </Button>
      </>
    );
  };

  return (
    <>
      <Modal open={modalOpen} formMode={formMode} initialValues={initialValues} callBack={handleModalCallBack} />
      <Box mx={13} my={5} sx={{ justifyContent: 'right', display: 'flex' }}>
        <Button variant="contained" onClick={handleCreateClick}>
          Create
        </Button>
      </Box>
      <Box mx={13} my={5}>
        <DataGrid rows={todos ?? []} columns={getColumns(action)} autoHeight />
      </Box>
    </>
  );
};
