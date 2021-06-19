import { isIOS } from 'react-device-detect';
import { $ } from '@/functions/utils';
export const CheckIos = () => {
  if (isIOS) {
    let body = $('body');
    body.classList.add('IosPadding');
  }
};
