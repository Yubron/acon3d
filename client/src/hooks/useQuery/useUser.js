import { request } from "../../utils/axios";

export const getUserInfo = async () => {
  return await request({
    url: `/user`,
  });
};