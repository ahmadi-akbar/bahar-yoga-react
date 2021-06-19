import React from 'react';
import { Modal, Card, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CloseRounded } from '@material-ui/icons';
import Tooltip from './Tooltip';
import clsx from 'clsx';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 40px',
    borderRadius: 20,
    boxShadow: '0 10px 25px 0 rgba(0, 0, 0, 0.05)',
    animation: 'zoomIn 1s',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#052971',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 100000,
    '& svg': {
      position: 'absolute',
      cursor: 'pointer',
      top: 30,
      right: 40,
      color: '#f44336',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.5)',
      },
    },
  },
});

export default function CustomModal({
  open = false,
  onClose,
  title,
  className,
  children,
}) {
  const cls = useStyles();
  return (
    <Modal
      open={open}
      className={cls.modal}
      closeAfterTransition
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      disableBackdropClick
      onClose={onClose}>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Card className={clsx(cls.card, className)}>
          <div className={cls.header}>
            <Tooltip title="أغلق">
              <CloseRounded onClick={onClose} />
            </Tooltip>
            <span>{title}</span>
          </div>
          {children}
        </Card>
      </Slide>
    </Modal>
  );
}
