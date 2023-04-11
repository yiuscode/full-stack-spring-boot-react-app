import { useState } from 'react';
import axios from 'axios';
import { SERVER_END_POINT } from '../../../constant';
import { useSnackbar } from '../../../context/snakebar';
import { Todo } from '../../../types';
interface CreateTodoResponse {
  success: boolean;
  message: string;
}

interface UseCreateTodoResponse {
  response: CreateTodoResponse;
  handleCreate: (userId: string, todo: Todo) => Promise<void>;
}

const useCreateTodo = (): UseCreateTodoResponse => {
  const [response, setResponse] = useState<CreateTodoResponse>({
    success: false,
    message: '',
  });
  const { displaySnackbar } = useSnackbar();

  const handleCreate = async (userId: string, todo: Todo) => {
    try {
      const createResponse = await axios.post<CreateTodoResponse>(`${SERVER_END_POINT}/user/${userId}/todos`, todo);
      setResponse(createResponse.data);
      displaySnackbar('Successfully created todo list.');
    } catch (error) {
      displaySnackbar('Failed to create todo: ' + (error as any).message, 'error');
    }
  };

  return { response, handleCreate };
};

export default useCreateTodo;
