import {
  MessageList,
  Window,
} from 'stream-chat-react';

import { MessagingChannelHeader } from '../../components';

export const ChannelInner = () => {

  return (
    <>
      <Window>
        <MessagingChannelHeader />
        <MessageList disableDateSeparator messageActions={[]} />
      </Window>
    </>
  );
};
