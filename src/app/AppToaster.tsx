import { Alert, Snackbar } from "@mui/material";
import { selectUi, toastHidden } from "@/redux/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const AppToaster = () => {
  const dispatch = useAppDispatch();
  const { toast } = useAppSelector(selectUi);

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={4000}
      onClose={() => dispatch(toastHidden())}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={toast.severity} variant="filled" onClose={() => dispatch(toastHidden())}>
        {toast.message}
      </Alert>
    </Snackbar>
  );
};
