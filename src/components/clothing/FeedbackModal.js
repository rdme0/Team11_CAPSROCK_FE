import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/AxiosInstance"; // 실제 경로에 맞게 수정하세요
import CustomSlider from "./CustomSlider";

const FeedbackModal = ({ onClose }) => {
  const [scores, setScores] = useState({
    morning: 0,
    noon: 0,
    evening: 0
  });
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleSliderChange = (time, value) => {
    setScores((prev) => ({
      ...prev,
      [time]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/api/clothing", {
        morningScore: scores.morning,
        noonScore: scores.noon,
        eveningScore: scores.evening,
        comment: comment
      });
      alert("피드백 제출이 완료되었습니다.");
      navigate("/clothing");
    } catch (error) {
      console.error(error);
      alert("피드백 제출에 실패하였습니다.");
      navigate("/clothing");
    } finally {
      onClose();
    }
  };

  return (
    <div className="modalBackdrop">
      <div className="modalBox">
        <span className="modalTitle">저번 하루는 어떠셨나요?</span>

        {["morning", "noon", "evening"].map((timeKey, i) => {
          const timeLabel = ["아침", "낮", "저녁"][i];
          return (
            <div key={timeKey} className="sliderRow">
              <div className="iconLabel">
                <img src={`/assets/clothing/icon/${timeLabel}.svg`}
                     alt={timeLabel} />
                <span>{timeLabel}</span>
              </div>
              <CustomSlider
                value={scores[timeKey]}
                onChange={(val) => handleSliderChange(timeKey, val)}
              />
              <div className="sliderLabels">
                <span className="cold">너무 추워요</span>
                <span className="okay">적당해요</span>
                <span className="hot">너무 더워요</span>
              </div>
            </div>
          );
        })}

        <div className="feedbackString">
          <label htmlFor="feedback">추가로 남기고 싶은 말이 있나요?</label>
          <textarea
            id="feedback"
            placeholder="자세한 피드백은 AI 학습에 많은 도움이 됩니다!"
            rows="3"
            className="feedbackTextarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="modalButtons">
          <button onClick={handleSubmit}>확인</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
