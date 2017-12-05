import React from 'react';

import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';

export default (props) => {
  const FacebookIcon = generateShareIcon('facebook');
  const TwitterIcon = generateShareIcon('twitter');
  const LinkedinIcon = generateShareIcon('linkedin');
  const TelegramIcon = generateShareIcon('telegram');
  const RedditIcon = generateShareIcon('reddit');

  const {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    RedditShareButton,
  } = ShareButtons;

  return (
    <ul className="social-share">
      <li>
        <FacebookShareButton url={window.location.href}>
          <FacebookIcon size={32} />
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton url={window.location.href}>
          <TwitterIcon size={32} />
        </TwitterShareButton>
      </li>
      <li>
        <LinkedinShareButton url={window.location.href}>
          <LinkedinIcon size={32} />
        </LinkedinShareButton>
      </li>
      <li>
        <TelegramShareButton url={window.location.href}>
          <TelegramIcon size={32} />
        </TelegramShareButton>
      </li>
      <li>
        <RedditShareButton url={window.location.href}>
          <RedditIcon size={32} />
        </RedditShareButton>
      </li>
    </ul>);
};
