import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Box, TextField, Button, Typography, Checkbox, InputLabel } from '@mui/material';
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Todo } from '../../types';
import useUpdateTodo from './hooks/useUpdateTodo';
import { useAuth } from '../../context/security';
import useCreateTodo from './hooks/useCreaateTodo';

const validationSchema = Yup.object().shape({
  description: Yup.string().required('Description is required').min(10).max(100),
  date: Yup.string().required('date is required'),
});

interface TodoModalProps {
  formMode: 'Edit' | 'Create';
  open: boolean;
  initialValues: Todo;
  callBack: () => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ formMode, open, initialValues, callBack }) => {
  const { handleUpdate } = useUpdateTodo();
  const { handleCreate } = useCreateTodo();
  const { user } = useAuth();

  const handleSubmit = (values: Todo) => {
    if (formMode === 'Create') {
      handleCreate(user?.id ?? '', values).then(() => callBack());
    } else if (formMode === 'Edit') {
      handleUpdate(user?.id ?? '', values).then(() => callBack());
    }
  };

  return (
    <>
      <Modal open={open}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            justifyContent: 'center',
            position: 'absolute',
            width: '30%',
            backgroundColor: 'background.paper',
            boxShadow: 24,
            py: 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 2,
          }}
        >
          <Box mx={5} my={2}>
            <Typography variant="h6">{formMode} Todo</Typography>
          </Box>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {(formik) => (
              <Form>
                <Box
                  mx={5}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <InputLabel>Description</InputLabel>
                  <Field
                    sx={{ mb: 1 }}
                    as={TextField}
                    fullWidth
                    value={formik.values.description}
                    name="description"
                    variant="outlined"
                    error={!!ErrorMessage}
                    helperText={<ErrorMessage name="description" />}
                  />
                  <InputLabel>Target Date</InputLabel>

                  <Field
                    sx={{ mb: 1 }}
                    as={TextField}
                    fullWidth
                    value={new Date(formik.values.date).toISOString().split('T')[0]}
                    type="date"
                    name="date"
                    variant="outlined"
                    error={!!ErrorMessage}
                    helperText={<ErrorMessage name="date" />}
                  />

                  <Box alignItems="center" display="flex" flexDirection="row">
                    <Checkbox checked={formik.values.done} onChange={() => formik.setFieldValue('done', !formik.values.done)} />
                    <InputLabel>Done</InputLabel>
                  </Box>
                  <Button sx={{ mb: 1 }} variant="contained" color="primary" type="submit" disabled={formik.isSubmitting}>
                    Submit
                  </Button>
                  <Button
                    sx={{ mb: 1 }}
                    variant="contained"
                    color="inherit"
                    disabled={formik.isSubmitting}
                    onClick={() => callBack()}
                  >
                    Cancel
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default React.memo(TodoModal);
