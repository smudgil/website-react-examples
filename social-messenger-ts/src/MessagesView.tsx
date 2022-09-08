import React, { useState } from 'react';
import type { ChannelFilters, ChannelOptions, ChannelSort } from 'stream-chat';
import { Chat, Channel, ChannelList } from 'stream-chat-react';

import '@stream-io/stream-chat-css/dist/css/index.css';
import './App.css';

import {
  MessagingChannelList,
  MessagingChannelListHeader,
  MessagingChannelPreview,
} from './components';

import { ChannelInner } from './components/ChannelInner/ChannelInner';
import { useConnectUser } from './hooks/useConnectUser';
import { useTheme } from './hooks/useTheme';
import { useChecklist } from './hooks/useChecklist';
import { useUpdateAppHeightOnResize } from './hooks/useUpdateAppHeightOnResize';
import { useMobileView } from './hooks/useMobileView';
import type { StreamChatGenerics } from './types';

type MessagingProps = {
  apiKey: string;
  userToConnect: { id: string; name?: string; image?: string };
  userToken: string | undefined;
  targetOrigin: string;
  channelListOptions: {
    options: ChannelOptions;
    filters: ChannelFilters;
    sort: ChannelSort;
  };
};

const MessagesView = (props: MessagingProps) => {
  const { apiKey, userToConnect, userToken, targetOrigin, channelListOptions } = props;

  const chatClient = useConnectUser<StreamChatGenerics>(apiKey, userToConnect, userToken);
  const toggleMobile = useMobileView();
  const theme = useTheme(targetOrigin);

  useChecklist(chatClient, targetOrigin);
  useUpdateAppHeightOnResize();

  if (!chatClient) {
    return null; // render nothing until connection to the backend is established
  }

  return (
    <Chat client={chatClient} theme={`messaging ${theme}`} >
      <div className='messaging__sidebar' id='mobile-channel-list' onClick={toggleMobile}>
        <MessagingChannelListHeader
          theme={theme}
        />
        <ChannelList
          filters={channelListOptions.filters}
          sort={channelListOptions.sort}
          options={channelListOptions.options}
          List={MessagingChannelList}
          Preview={(props) => <MessagingChannelPreview {...props}  />}
        />
      </div>
      <div>
        <Channel
        >
            <ChannelInner  />
        </Channel>
      </div>
    </Chat>
  );
};

export default MessagesView;
