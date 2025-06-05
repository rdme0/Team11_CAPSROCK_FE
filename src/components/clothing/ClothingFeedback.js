import React, { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import "./FeedbackModal.css";
import "./ClothingFeedback.css";

const ClothingFeedback = ({ havePendingFeedback, onFeedbackSubmitted }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleFeedbackSuccess = () => {
    setShowModal(false);
    if (onFeedbackSubmitted) {
      onFeedbackSubmitted();
    }
  };

  if (!havePendingFeedback) {
    return (
      <div className="learningDescription">
        <img src={`${process.env.PUBLIC_URL}/assets/clothing/icon/ai.svg`} alt="AI icon" />
        <span>사용자의 옷차림 특성을 학습중입니다</span>
      </div>
    );
  }

  return (
    <div className="feedbackContainer">
      지난번 옷차림 추천을 평가해주세요
      <button className={"feedbackButton"} onClick={handleOpen}>평가하기</button>
      {showModal && (
        <FeedbackModal
          onClose={handleClose}
          onSuccess={handleFeedbackSuccess}
        />
      )}
    </div>
  );
};

export default ClothingFeedback;