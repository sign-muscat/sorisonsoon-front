import { useRef, useState } from "react";
import Confetti from "react-confetti";
import QuitGame from "../../components/button/QuitGame";
import LipHeader from "../../components/game/LipHeader";
import LipSimilarityTable from "../../components/table/LipSimilarityTable";
import LipGameAnswer from "./LipGameAnswer";
import LipGameHint from "./LipGameHint";
import LipGameQuestion from "./LipGameQuestion";

function LipGamePage({ difficulty, onQuitGame }) {
    const webcamRef = useRef(null); // Webcam ref를 유지하지만 사용하지 않음

    const [answer, setAnswer] = useState(""); // 사용자가 입력한 정답
    const [attempts, setAttempts] = useState([]); // 사용자의 시도 기록
    const [showConfetti, setShowConfetti] = useState(false);

    const handleSubmit = () => {
        if (answer.trim() !== "") {
            setAttempts([...attempts, { answer, similarity: Math.random() * 100 }]);
            setAnswer(""); // 입력 필드 비우기
        }
    };

    return (
        <>
            <QuitGame onQuitGame={onQuitGame}/>
            <LipHeader title='너의 목소리가 보여' difficulty={difficulty}/>
            <LipGameQuestion/>
            <LipGameHint/>
            <LipGameAnswer handleSubmit={handleSubmit} setAnswer={setAnswer} answer={answer} />
            <LipSimilarityTable dataList={attempts} />
            {showConfetti &&
                <Confetti width={window.innerWidth} height={window.innerHeight}
                          recycle={false}/>
            }
        </>

    );
}

export default LipGamePage;
