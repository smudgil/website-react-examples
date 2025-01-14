import './MessagingChannelPreview.css';
import {
  ChannelPreviewUIComponentProps,
  ChatContextValue,
  useChatContext,
} from 'stream-chat-react';
import { AvatarGroup } from '../';

import type { Channel, ChannelMemberResponse } from 'stream-chat';
import type { StreamChatGenerics } from '../../types';


const getChannelName = (members: ChannelMemberResponse[]) => {
  const defaultName = 'Johnny Blaze';

  if (!members.length || members.length === 1) {
    return members[0]?.user?.name || defaultName;
  }

  return `${members[0]?.user?.name || defaultName}, ${members[1]?.user?.name || defaultName}`;
};

type Props = ChannelPreviewUIComponentProps & {
  channel: Channel;
  setActiveChannel?: ChatContextValue['setActiveChannel'];
};

const MessagingChannelPreview = (props: Props) => {
  const { channel, lastMessage, setActiveChannel,  } = props;
  const { channel: activeChannel, client } = useChatContext<StreamChatGenerics>();

  const members = Object.values(channel.state.members).filter(
    ({ user }) => user?.id !== client.userID,
  );

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? 'channel-preview__container selected'
          : 'channel-preview__container'
      }
      onClick={() => {
        setActiveChannel?.(channel);
      }}
    >
      <AvatarGroup members={members} />
      <div className='channel-preview__content-wrapper'>
        <div className='channel-preview__content-top'>
          <p className='channel-preview__content-name'>
            {channel.data?.name || getChannelName(members)}
          </p>
        </div>
        <p className='channel-preview__content-message'>{channel.countUnread() > 0 ? `${channel.countUnread()} unread` : (lastMessage?.text ?? "No messages yet.")}</p>
      </div>
    </div>
  );
};

export default MessagingChannelPreview;
