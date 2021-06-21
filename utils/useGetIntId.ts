import {useRouter} from "next/router";

export const useGetIntId = () => {
  const router = useRouter();
  return typeof router.query.slug[0] === "string" ? parseInt(router.query.slug[0]) : -1;
};