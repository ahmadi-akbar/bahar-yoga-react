import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Swiper from 'react-id-swiper';
import Modal from '@/components/Modal';
import { MainUrl } from '@/functions';

const SwiperParams = {
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  rtl: true,
};

const useStyles = makeStyles(({ breakpoints: BP }) => ({
  card: {
    flexDirection: 'column',
    minWidth: '50vw',
    minHeight: 400,
    padding: '50px !important',
    [BP.down('sm')]: {
      width: '-webkit-fill-available',
      padding: '30px 20px !important',
      borderRadius: 10,
      margin: '0 10px',
    },
  },
  swiper: {
    position: 'relative',
    // margin: 'auto',
    width: '45vw',
    height: 350,
    '& div.swiper-slide': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& img, video': {
      height: '100%',
      maxWidth: '80%',
      objectFit: 'contain',
    },
    [BP.down('sm')]: {
      width: '100%',
      height: 350,
      '& img, video': {
        height: 220,
        width: 220,
        objectFit: 'unset',
      },
    },
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    [BP.down('sm')]: {
      fontSize: 20,
    },
  },
}));

const getField = (file = {}) => {
  let kind = file.type.split('/').shift();
  let src = `${MainUrl}/${file.url}`;
  switch (kind) {
    case 'image':
      return <img alt="uploaded compressed" src={src} />;
    case 'video':
      return (
        <video controls>
          <source src={src} type={file.type} />
          <source src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      );

    case 'audio':
      return (
        <audio controls>
          <source src={src} type={file.type} />
          Your browser does not support the audio element.
        </audio>
      );

    default:
      return null;
  }
};

export default function StoryModal({ open, onClose, item = {} }) {
  const cls = useStyles();
  const { files = [] } = item;
  return (
    <Modal open={open} onClose={onClose} title className={cls.card}>
      <Swiper containerClass={cls.swiper} {...SwiperParams}>
        {files.map((i, idx) => (
          <div key={idx}>{getField(i)}</div>
        ))}
      </Swiper>

      <div className={cls.title}>{item.title}</div>
    </Modal>
  );
}
