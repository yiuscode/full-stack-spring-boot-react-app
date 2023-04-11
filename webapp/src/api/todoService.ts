import axios from 'axios';
import { SERVER_END_POINT } from '../constant';

export const getTodosByUserId = async (userId: string) => {
  try {
    const res = await axios.get(SERVER_END_POINT + `/user/${userId}/todos`);
    return res;
  } catch (error) {
    throw new Error(error as any);
  }
};
