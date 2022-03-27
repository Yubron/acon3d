import { useMutation } from "react-query";
import { request } from "../../utils/axios";
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from "./useUser";

function authRegister(email, password, role) {
  return request({
    method: 'post',
    url: '/auth/register',
    data: { email, password, role },
  });
}

export function useAuthRegister() {
  const navigate = useNavigate();
  return useMutation(
    reigsterDto => {
      return authRegister(
        reigsterDto.email,
        reigsterDto.password,
        reigsterDto.role,
      );
    },
    {
      onSuccess: () => {
        alert('회원가입이 완료되었습니다.');
        navigate('/login')
      },
      onError: () => {
        alert('중복된 이메일 혹은 비밀번호가 잘못되었습니다.')
      },
    },
  );
}

function authLogin(email, password) {
  return request({
    method: 'post',
    url: '/auth/login',
    data: { email, password },
  });
}

export function useAuthLogin() {
  const navigate = useNavigate();
  return useMutation(
    loginDto => {
      return authLogin(
        loginDto.email,
        loginDto.password,
      );
    },
    {
      onSuccess: async (data) => {
        localStorage.setItem('aconToken', data.data.accessToken);
        const res = await getUserInfo(data.data.accessToken);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('role', res.data.role);
        navigate('/')
      },
      onError: () => {
        alert('이메일 혹은 비밀번호가 잘못되었습니다.')
      },
    },
  );
}