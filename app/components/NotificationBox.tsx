import React, { useState } from "react";

interface NotificationProps {
  message: string;
  onClose: () => void;
}
const NotificationBox = ({ message, onClose }: NotificationProps) => {
  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-card rounded-lg p-6 shadow-lg w-[40%] min-w-96 border border-border">
        <span className="text-2xl font-bold text-foreground">Notification</span>
        <div className="py-2 text-muted-foreground">{message}</div>
        <div className="flex justify-end pt-3">
          <button onClick={onClose} className="btn btn-neutral">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationBox;
