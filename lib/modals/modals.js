import dynamic from "next/dynamic";

export const modals = {
  "new-index": dynamic(() => import("../../components/Modals/NewIndex")),
  "delete-index": dynamic(() => import("../../components/Modals/DeleteIndex")),
  "reset-settings": dynamic(() =>
    import("../../components/Modals/ResetSettings")
  ),
};
