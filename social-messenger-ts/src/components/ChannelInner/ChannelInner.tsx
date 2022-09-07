import {
  MessageList,
  Window,
} from 'stream-chat-react';

import { MessagingChannelHeader, MessagingInput } from '../../components';

export const ChannelInner = () => {


  const actions = ['delete', 'edit', 'flag', 'mute', 'react', 'reply'];

  return (
    <>
      <Window>
        <MessagingChannelHeader />
        <MessageList disableDateSeparator messageActions={actions} />
      </Window>
    </>
  );
};
