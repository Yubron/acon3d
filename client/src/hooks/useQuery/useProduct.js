import { useQuery } from "react-query";
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
    // onError: (error) => 
  });
}; 