import type { ChannelMemberResponse } from 'stream-chat';

import type { StreamChatGenerics } from '../types';

import sampleImage from './userImages/photo-1573140247632-f8fd74997d5c.jpeg';

export { ChannelInfoIcon } from './ChannelInfoIcon';
export { ChannelSaveIcon } from './ChannelSaveIcon';
export { CommandIcon } from './CommandIcon';
export { EmojiIcon } from './EmojiIcon';
export { HamburgerIcon } from './HamburgerIcon';
export { LightningBoltSmall } from './LightningBoltSmall';
export { SendIcon } from './SendIcon';
export { XButton } from './XButton';
export { XButtonBackground } from './XButtonBackground';

const staticImages = [
  sampleImage,
];

export const getImage = (userId: string) => {
  const hash = hashCode(userId);
  const index = Math.abs(hash) % staticImages.length;
  return staticImages[index];
};

export const getCleanImage = (member: ChannelMemberResponse<StreamChatGenerics>) => {
  let cleanImage = member.user?.image || '';
  const cleanIndex = staticImages.indexOf(cleanImage);
  if (cleanIndex === -1) {
    cleanImage = getImage(member.user_id || 'stream-user');
  }

  return cleanImage;
};

// https://stackoverflow.com/a/7616484/1270325
const hashCode = (value: string) => {
  let hash = 0;
  if (value.length === 0) return hash;
  for (let i = 0; i < value.length; i++) {
    const chr = value.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
