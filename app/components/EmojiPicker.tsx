"use client"
import { EmojiClickData } from 'emoji-picker-react';
import dynamic from 'next/dynamic'

const EmojiPicker = dynamic(
    () => import('emoji-picker-react'),
    { 
      ssr: false
    }
  );
const EmojiPickerComponent = () => {
  return (
    <div>
      <EmojiPicker onEmojiClick={(emojiData: EmojiClickData, event: MouseEvent) => {}}/>
    </div>
  );
};

export default EmojiPickerComponent;
