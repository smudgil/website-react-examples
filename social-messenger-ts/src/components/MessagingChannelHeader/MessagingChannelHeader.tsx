import React, { useEffect, useState } from 'react';
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import './MessagingChannelHeader.css';
import { AvatarGroup } from '../';

import type { StreamChatGenerics } from '../../types';

const MessagingChannelHeader = () => {
  const { client } = useChatContext<StreamChatGenerics>();
  const { channel } = useChannelStateContext<StreamChatGenerics>();
  const [channelName] = useState(channel.data?.name || '');
  const [_, setTitle] = useState('');

  const members = Object.values(channel.state.members || {}).filter(
    (member) => member.user?.id !== client?.user?.id,
  );

  useEffect(() => {
    if (!channelName) {
      setTitle(
        members.map((member) => member.user?.name || member.user?.id || 'Unnamed User').join(', '),
      );
    }
  }, [channelName, members]);

  return (
    <div className='messaging__channel-header'>
      <AvatarGroup members={members} />
      <div className='channel-header__name'>{channelName}</div>
    </div>
  );
};

export default React.memo(MessagingChannelHeader);
