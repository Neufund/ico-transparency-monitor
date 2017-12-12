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
  const projectName = props.projectName;
  const title = `Stats and Transparency score for ${projectName}`;
  const description = `Explore real time stats on raised funds, 
  tokens and investors in ${projectName} and review comprehensive 
  transparency score based on ${projectName} smart contracts code.`;

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
        <FacebookShareButton
          url={window.location.href}
          quote={`${title}, ${description}`}
        >
          <FacebookIcon size={32} />
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton url={window.location.href} title={title} via={description}>
          <TwitterIcon size={32} />
        </TwitterShareButton>
      </li>
      <li>
        <LinkedinShareButton url={window.location.href} title={title} description={description}>
          <LinkedinIcon size={32} />
        </LinkedinShareButton>
      </li>
      <li>
        <TelegramShareButton url={window.location.href} title={title}>
          <TelegramIcon size={32} />
        </TelegramShareButton>
      </li>
      <li>
        <RedditShareButton url={window.location.href} title={title}>
          <RedditIcon size={32} />
        </RedditShareButton>
      </li>
    </ul>);
};
