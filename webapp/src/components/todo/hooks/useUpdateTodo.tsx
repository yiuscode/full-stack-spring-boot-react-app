import { useState } from 'react';
import axios from 'axios';
import { SERVER_END_POINT } from '../../../constant';
import { useSnackbar } from '../../../context/snakebar';
import { Todo } from '../../../types';

interface UpdateTodoListResponse {
  success: boolean;
  message: string;
}

interface UseUpdateTodoListResponse {
  response: UpdateTodoListResponse;
  handleUpdate: (userId: string, todo: Todo) => Promise<void>;
}

const useUpdateTodo = (): UseUpdateTodoListResponse => {
  const [response, setResponse] = useState<UpdateTodoListResponse>({
    success: false,
    message: '',
  });
  const { displaySnackbar } = useSnackbar();

  const handleUpdate = async (userId: string, todo: Todo) => {
    try {
      const updateResponse = await axios.put<UpdateTodoListResponse>(SERVER_END_POINT + `/user/${userId}/todos/${todo.id}`, todo);
      setResponse(updateResponse.data);
      displaySnackbar('Successfully updated todo list.');
    } catch (error) {
      displaySnackbar('Failed to update todo list: ' + error, 'error');
    }
  };

  return { response, handleUpdate };
};

export default useUpdateTodo;
