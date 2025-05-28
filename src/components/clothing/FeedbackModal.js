const FeedbackModal = ({ onClose }) => {
  return (
      <div className="modalBackdrop">
        <div className="modalBox">
          <h3>저번 하루는 어떠셨나요?</h3>

          {["아침", "낮", "저녁"].map((time, i) => (
              <div key={i} className="sliderRow">
                <div className="iconLabel">
                  <img src={`/assets/common/navigationBar/${time}.svg`} alt={time} />
                  <span>{time}</span>
                </div>
                <input type="range" min="0" max="100" defaultValue="50" className="slider" />
                <div className="sliderLabels">
                  <span className="cold">너무 추워요</span>
                  <span className="okay">적당해요</span>
                  <span className="hot">너무 더워요</span>
                </div>
              </div>
          ))}

          <div className="modalButtons">
            <button onClick={onClose}>확인</button>
            <button onClick={onClose}>취소</button>
          </div>
        </div>
      </div>
  );
};

export default FeedbackModal;
