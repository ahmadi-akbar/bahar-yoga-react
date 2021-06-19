import React from 'react';
import { Grid } from '@material-ui/core';
import _get from 'lodash/get';
import _truncate from 'lodash/truncate';
import { MainUrl } from '@/functions';
import { defaultImg } from '@/assets';

export default function StoryCard({ onClick, item }) {
  let img = _get(item, 'files[0].url', null);

  let url = img ? `${MainUrl}/${img}` : defaultImg;
  return (
    <Grid item onClick={onClick}>
      <div className="category__card">
        <div style={{ backgroundImage: `url('${url}')` }}></div>
        <span>{_truncate(item.title, { length: 59 })}</span>
      </div>
    </Grid>
  );
}
