import { Todo, User } from '../types';

export const dummyUser: User = {
  id: '1',
  email: 'jack@example.com',
  name: 'Jack Wong',
};

export const dummyTodos: Todo[] = [
  {
    id: '5765081d-1a71-4b99-99c6-60ca9f7a06e2',
    description: 'Buy groceries',
    done: false,
    date: Date.now(),
  },
];
