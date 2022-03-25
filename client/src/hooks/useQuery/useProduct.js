import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { request } from "../../utils/axios";

// GET APPROVED PRODUCT
const getApprovedProducts = ({ page=1 }) => {
  return request({
    url: `/product?page=${page}`,
  });
};

export const useGetApprovedProducts = ({ page=1 }) => {
  return useQuery(['getApprovedProducts', page ], () => getApprovedProducts({ page }), {
    select: data => data.data,
  });
}; 

// GET PENDING PRODUCT
const getPendingProducts = ({ page=1 }) => {
  return request({
    url: `/product/status/pending?page=${page}`,
  });
};

export const useGetPendingProducts = ({ page=1 }) => {
  return useQuery(['getPendingProducts', page ], () => getPendingProducts({ page }), {
    select: data => data.data,
  });
}; 

// POST PRODUCT
const createProduct = (title, content, price) => {
  return request({
    method: 'post',
    url: `/product`,
    data: {title, content, price: parseInt(price)}
  })
}

export const useCreateProduct = () => {
  const navigate = useNavigate()
  return useMutation(
    createProductDto => {
      return createProduct(
        createProductDto.title,
        createProductDto.content,
        createProductDto.price,
      );
    },
    {
      onSuccess: () => {
        alert('등록이 완료되었습니다 !');
        navigate('/')
      }
    },
  );
}