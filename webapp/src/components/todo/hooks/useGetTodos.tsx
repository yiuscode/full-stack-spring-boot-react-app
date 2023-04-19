import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_END_POINT } from '../../../constant';
import { Todo } from '../../../types';
import { useSnackbar } from '../../../context/snakebar';
import { useAuth } from '../../../context/security';
import React from 'react';

const useGetTodos = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const { displaySnackbar } = useSnackbar();
  const { user } = useAuth();
  const fetchTodos = React.useCallback(async () => {
    try {
      const config = {
        headers: {
          auth: 'Basic dXNlcjoxMjM0',
        },
      };
      const response = await axios.get<Todo[]>(SERVER_END_POINT + `/user/${user?.id ?? ''}/todos`);
      const newList = [...response.data];
      setTodos(newList);
    } catch (error) {
      console.log('error: ', error);
      displaySnackbar('Failed to fetch todos' + (error as any).message, 'error');
    }
  }, [displaySnackbar, user]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return { todos, fetchTodos, setTodos };
};

export default useGetTodos;
