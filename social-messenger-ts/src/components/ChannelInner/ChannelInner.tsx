import {
  MessageList,
  Window,
} from 'stream-chat-react';

import { MessagingChannelHeader, MessagingInput } from '../../components';

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
