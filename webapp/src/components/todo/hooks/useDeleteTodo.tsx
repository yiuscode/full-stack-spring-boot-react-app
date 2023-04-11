import { useState } from 'react';
import axios from 'axios';
import { SERVER_END_POINT } from '../../../constant';
import { useSnackbar } from '../../../context/snakebar';

interface DeleteTodoListResponse {
  success: boolean;
  message: string;
}

interface UseDeleteTodoListResponse {
  response: DeleteTodoListResponse;
  handleDelete: (userId: string, todoId: number) => Promise<void>;
}

const useDeleteTodoList = (): UseDeleteTodoListResponse => {
  const [response, setResponse] = useState<DeleteTodoListResponse>({
    success: false,
    message: '',
  });
  const { displaySnackbar } = useSnackbar();

  const handleDelete = async (userId: string, todoId: number) => {
    try {
      const deleteResponse = await axios.delete<DeleteTodoListResponse>(SERVER_END_POINT + `/user/${userId}/todos/${todoId}`);
      setResponse(deleteResponse.data);
      displaySnackbar('Successfully deleted todo list.');
    } catch (error) {
      displaySnackbar('Failed to delete todo list: ' + (error as any).message, 'error');
    }
  };

  return { response, handleDelete };
};

export default useDeleteTodoList;
