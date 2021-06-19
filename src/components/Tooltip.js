import React from 'react';
import { Tooltip, Zoom } from '@material-ui/core';

export default function CustomTooltip({ children, title }) {
  return (
    <Tooltip
      title={title}
      TransitionComponent={Zoom}
      leaveDelay={300}
      placement="top"
      arrow>
      {children}
    </Tooltip>
  );
}
