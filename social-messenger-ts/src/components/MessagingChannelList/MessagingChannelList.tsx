import React, { PropsWithChildren } from 'react';
import { ChannelListMessengerProps, useChatContext } from 'stream-chat-react';

import './MessagingChannelList.css';
import { SkeletonLoader } from './SkeletonLoader';

import type { StreamChatGenerics } from '../../types';

const MessagingChannelList = (props: PropsWithChildren<ChannelListMessengerProps>) => {
  const { children, error = false, loading } = props;
 useChatContext<StreamChatGenerics>();

  if (error) {
    return (
      <div className='messaging__channel-list__message'>
        Error loading conversations, please try again momentarily.
      </div>
    );
  }

  if (loading) {
    return (
      <div className='messaging__channel-list__message'>
        <SkeletonLoader />
      </div>
    );
  }

  return <>{children}</>;
};

export default React.memo(MessagingChannelList);
