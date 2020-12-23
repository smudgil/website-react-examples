import React, { useRef, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, enTranslations, Streami18n } from 'stream-chat-react';
import { createGlobalStyle } from 'styled-components';
import 'stream-chat-react/dist/css/index.css';

import './App.css';

import { ChannelContainer } from './components/ChannelContainer/ChannelContainer';
import { ChannelListContainer } from './components/ChannelListContainer/ChannelListContainer';
import { ColorSlider } from './components/ColorSlider/ColorSlider';

const urlParams = new URLSearchParams(window.location.search);
const apiKey = urlParams.get('apikey') || process.env.REACT_APP_STREAM_KEY;
const user = urlParams.get('user') || process.env.REACT_APP_USER_ID;
const theme = urlParams.get('theme') || 'light';
const userToken = urlParams.get('user_token') || process.env.REACT_APP_USER_TOKEN;

const i18nInstance = new Streami18n({
  language: 'en',
  translationsForLanguage: {
    ...enTranslations,
    Flag: 'Pin to Channel',
  },
});

// const GlobalColor = createGlobalStyle`
//   body {
//     --primary-color: ${(props) => props.color.current};
//   }
// `;

const filters = [{ type: 'team' }, { type: 'messaging' }];
const options = { state: true, watch: true, presence: true, limit: 3 };
const sort = { last_message_at: -1, updated_at: -1 };

const client = new StreamChat(apiKey);
client.setUser({ id: user }, userToken);

const setColor = (color) => {
  const root = document.documentElement;
  root.style.setProperty('--primary-color', color);
}

window.addEventListener("message", function(event) {
  setColor(event.data)
});

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // const primaryColor = useRef('78, 29, 157');

  return (
    <>
      <div className='app__wrapper'>
        <Chat {...{ client, i18nInstance }} theme={`team ${theme}`}>
          <ChannelListContainer
            {...{
              isCreating,
              filters,
              options,
              setCreateType,
              setIsCreating,
              setIsEditing,
              sort,
            }}
          />
          <ChannelContainer
            {...{
              createType,
              isCreating,
              isEditing,
              setIsCreating,
              setIsEditing,
            }}
          />
        </Chat>
      </div>
    </>
  );
};

export default App;