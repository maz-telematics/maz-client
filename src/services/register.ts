import axios from 'axios';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  message: string;
  user: { id: number; username: string };
}

const register = async (request: RegisterRequest): Promise<RegisterResponse> => {

  const response = await axios.post('/api/register', request);
  return response.data;
};



export default register;