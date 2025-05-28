import React, { useState } from 'react';
import FeedbackModal from './FeedbackModal';

const ClothingFeedback = ({ havePendingFeedback }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  if (!havePendingFeedback) {
    return (
      <div className="learningDescription">
        <img src="/assets/clothing/icon/ai.svg" alt="AI icon" />
        사용자의 옷차림 특성을 학습중입니다
      </div>
    );
  }

  return (
    <div className="feedbackContainer">
      지난번 옷차림 추천을 평가해주세요
      <button onClick={handleOpen}>평가하기</button>
      {showModal && <FeedbackModal onClose={handleClose} />}
    </div>
  );
};

export default ClothingFeedback;