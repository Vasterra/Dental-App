import { useRouter } from "next/router";

export const useGetIntId = () => {
  const router = useRouter();
  console.log(router)
  return router.query.id
};
