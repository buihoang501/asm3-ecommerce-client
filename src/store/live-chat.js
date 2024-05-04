//Import from  @redux-toolkit
import { createSlice } from '@reduxjs/toolkit';

//Initialize live chat state
const initialLiveChatState = {
  showLiveChat: false,
};

const liveChatSlice = createSlice({
  name: 'live-chat',
  initialState: initialLiveChatState,
  reducers: {
    toggleShowLiveChat(state, action) {
      state.showLiveChat = !state.showLiveChat;
    },
  },
});

// export live chat actions
export const liveChatActions = liveChatSlice.actions;

// export live chat slice reducer
export default liveChatSlice.reducer;
