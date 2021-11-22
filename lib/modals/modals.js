import dynamic from "next/dynamic";

export const modals = {
  "new-index": dynamic(() => import("../../components/Modals/NewIndex")),
  "delete-index": dynamic(() => import("../../components/Modals/DeleteIndex")),
  "delete-document": dynamic(() =>
    import("../../components/Modals/DeleteDocument")
  ),
  "update-setting": dynamic(() =>
    import("../../components/Modals/UpdateSetting")
  ),
  "reset-settings": dynamic(() =>
    import("../../components/Modals/ResetSettings")
  ),
  "add-records": dynamic(() => import("../../components/Modals/AddRecords")),
};
