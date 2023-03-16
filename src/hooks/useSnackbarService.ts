import React from "react";
import { useSnackbar } from "material-ui-snackbar-provider";
import { SnackbarSeverityType } from "@/shared/enum/general";

type TSnackBarServiceProps = {
  message: string;
  action?: string;
  handleAction?: () => void;
  customParameters?: any;
};

export default function useSnackbarService() {
  const snackbar = useSnackbar();
  return React.useMemo(() => {
    const showMessage =
      (type: string) =>
      ({
        message,
        action,
        handleAction,
        customParameters,
      }: TSnackBarServiceProps) =>
        snackbar.showMessage(message, action, (handleAction = () => {}), {
          ...customParameters,
          type,
        });
    return {
      ...snackbar,
      showInfo: showMessage(SnackbarSeverityType.Info),
      showWarning: showMessage(SnackbarSeverityType.Warning),
      showError: showMessage(SnackbarSeverityType.Error),
      showSuccess: showMessage(SnackbarSeverityType.Success),
    };
  }, [snackbar]);
}
