import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { MdTextFields } from "react-icons/md";
import {
  RiStickyNoteAddLine,
  RiCheckboxFill,
  RiImage2Line,
} from "react-icons/ri";
import { FaPaintBrush } from "react-icons/fa";
import { MdMicNone } from "react-icons/md";

import { useNavigate } from "react-router-dom";

interface Action {
  icon: React.ReactNode;
  name: string;
  path: string;
}
const actions: Action[] = [
  { icon: <MdTextFields />, name: "Text", path: "/create" },
  { icon: <RiCheckboxFill />, name: "List", path: "/list" },
  { icon: <RiImage2Line />, name: "Image", path: "/image" },
  { icon: <FaPaintBrush />, name: "Drawing", path: "/draw" },
  { icon: <MdMicNone />, name: "Audio", path: "/audio" },
];

export default function BasicSpeedDial() {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => navigate(action.path)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
