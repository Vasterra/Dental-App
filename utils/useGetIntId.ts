import {useRouter} from "next/router";

export const useGetIntId = () => {
  const router = useRouter();
  // @ts-ignore
  return typeof router.query.slug[0] === "string" ? parseInt(router.query.slug[0]) : -1;
};