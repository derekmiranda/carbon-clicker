import { useContext, useMemo } from "react";
import { Tooltip } from "react-tooltip";
import { ClickerContext } from "../reducers/context";

export default function PopupLogs() {
  const { popupLogs } = useContext(ClickerContext);
  const popupLogsArr = useMemo(() => Object.entries(popupLogs), [popupLogs]);

  return popupLogsArr.length
    ? popupLogsArr.map(([key, log]) => {
        return (
          <Tooltip
            key={key}
            isOpen={true}
            place="left"
            anchorSelect={`#${log.incitingButton!}`}
          >
            {log.message}
          </Tooltip>
        );
      })
    : null;
}
