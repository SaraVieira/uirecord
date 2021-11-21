import dynamic from "next/dynamic";

export const modals = {
  "new-index": dynamic(() => import("../../components/Modals/NewIndex")),
};
