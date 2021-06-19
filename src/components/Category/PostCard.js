import React from 'react';
import {Col} from 'shards-react';
import {withTranslation} from 'react-i18next';
import _truncate from 'lodash/truncate';

import {dFormat, PriceFormat} from '@/functions/utils';
import {MainUrl} from '@/functions';
import {defaultImg} from '@/assets';

function PostCard({onClick, item, t}) {
  let date = dFormat(item.updatedAt, t);
  let price = null;
  if (item.price) price = PriceFormat(item.price);

  return (
    <Col
      lg="4"
      md="6"
      sm="6"
      xs="12"
      className="mb-4 ad-card-col"
      onClick={onClick}>
      <div
        className="ad-card-main-div"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          width: '100%',
          height: 150,
        }}>
        {/*<div className="ad-card-content">*/}
          {/*<span className="a-card-post_title">*/}
            {/*{_truncate(item.post_post_title, {length: 59})}*/}
          {/*</span>*/}
          {/*<div>*/}
            {/*<div className={'jhgfdfgh'}>*/}
              {/*<div className={"kiuytfty"}>*/}

               {/*<span className={"jhgfdtyuwd"}>*/}

                  {/*/!*{item.SC.FS.S1 || "0"}*!/*/}
            {/*</span>*/}
                {/*/!*<span*!/*/}
                  {/*/!*className="rftgyhu"*!/*/}
                  {/*/!*style={{*!/*/}
                    {/*/!*backgroundImage: `url('${("https://x-1xbet-19391.world/sfiles/logo_teams"+"/"+item.O1IMG[0]) || defaultImg}')`,*!/*/}
                  {/*/!*}}*!/*/}

              {/*</div>*/}
              {/*<div className={"kiuytfty"}>*/}

             {/*<span className={"jhgfdtyuwd"}>*/}

             {/*/!*{item.SC.FS.S2 || "0"}*!/*/}
            {/*</span>*/}
                {/*/!*<span*!/*/}
                  {/*/!*className="rftgyhu"*!/*/}
                  {/*/!*style={{*!/*/}
                    {/*/!*backgroundImage: `url('${("https://x-1xbet-19391.world/sfiles/logo_teams"+"/"+item.O2IMG[0]) || defaultImg}')`,*!/*/}
                  {/*/!*}}*!/*/}


              {/*</div>*/}
            {/*</div>*/}

            {/*{item.post_content && <p className="card-text">*/}
              {/*{item.post_content}*/}
            {/*</p>}*/}
            {/*<div className={'wer'}>*/}
              {/*<span className=" text-fiord-blue card-non-post_title-item">*/}
                {/*/!*{item.SC.CPS}*!/*/}
              {/*</span>*/}
              {/*<span className=" text-fiord-blue card-non-post_title-item">*/}

              {/*</span>*/}
            {/*</div>*/}
            {/*{price && (*/}
              {/*<div className={'wer'}>*/}
                {/*<span className="card-non-post_title-item">*/}
                  {/*/!*{price + ' ' + t('Rial')}*!/*/}
                {/*</span>*/}
              {/*</div>*/}
            {/*)}*/}
            {/*<div*/}
              {/*style={{*/}
                {/*display: 'flex',*/}
                {/*width: '100%',*/}
                {/*flexDirection: 'row',*/}
                {/*justifyContent: 'space-between',*/}
                {/*alignItems: 'center',*/}
              {/*}}>*/}
              {/*/!*{item.type !== 'product' && (*!/*/}
              {/*/!*<div className={'wer'}>*!/*/}
              {/*/!*<span className="card-non-post_title-item">*!/*/}
              {/*/!*{item.countryChoosed &&*!/*/}
              {/*/!*item.countryChoosed[1] &&*!/*/}
              {/*/!*item.countryChoosed[1].name}*!/*/}
              {/*/!*</span>*!/*/}
              {/*/!*{item.countryChoosed && item.countryChoosed[1] && (*!/*/}
              {/*/!*<span className="card-non-post_title-item">{' / '}</span>*!/*/}
              {/*/!*)}*!/*/}
              {/*/!*</div>*!/*/}
              {/*/!*)}*!/*/}

              {/*/!*{date && (*!/*/}
              {/*/!*<div className={'wer'}>*!/*/}
              {/*/!*<span className="card-non-post_title-item">{date}</span>*!/*/}
              {/*/!*</div>*!/*/}
              {/*/!*)}*!/*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}

        {/*<div*/}
        {/*className="card-post__image"*/}
        {/*style={{*/}
        {/*backgroundImage: `url('${(MainUrl+"/"+item.backgroundImage) || defaultImg}')`,*/}
        {/*}}*/}
        {/*/>*/}
        <div className="ad-card-content">
          <a className="a-card-post_title" onClick={(e) => {
            e.preventDefault();
            // goToPage(item);
          }}>
            {item.post_title.length > 59 ? item.post_title.slice(0, 59) + "..." : item.post_title}
          </a>
          <div>
            {
              item.post_excerpt &&
              <p className="card-text">{item.post_excerpt}</p>
            }
            <div className={'wer'}>
                  <span className=" text-fiord-blue card-non-post_title-item">
                    {t('in ')}
                  </span>
              <span className=" text-fiord-blue card-non-post_title-item">
                    {/*<a href={item.categoryUrl}>*/}
                    {/*{item.firstCategory.name.fa?item.firstCategory.name.fa:item.firstCategory.name}*/}
                    {/*</a>*/}
                {item.post_date}
                  </span>
            </div>
            {
              price &&
              <div className={'wer'}>
                    <span className="card-non-post_title-item">
                      {price + " " + t('Toman')}
                    </span>
              </div>
            }
            <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              {item.type !== 'product' &&
              <div className={'wer'}>
                      <span className="card-non-post_title-item">
                        {/*{item.countryChoosed && item.countryChoosed[1] && item.countryChoosed[1].name}*/}
                      </span>
                {/*{item.countryChoosed && item.countryChoosed[1] && <span className="card-non-post_title-item">*/}
                        {/*{' / '}*/}
                    {/*</span>}*/}
              </div>

              }

              {item.t &&
              <div className={'wer'}>
                      <span className="card-non-post_title-item">
                        {item.t}
                      </span>
              </div>
              }
            </div>
          </div>
        </div>

        <div
          className="card-post__image"
          style={{backgroundImage: `url('${(item.post_image_featured && item.post_image_featured['0']) || ''}')`}}
          onClick={() => {
            // goToPage(item);
          }}
        />
      </div>
    </Col>
  );
}

export default withTranslation()(PostCard);
