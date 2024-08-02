import { Box, Button, Divider, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import GameCard from "../components/card/GameCard";

function MainPage() {
    const navigate = useNavigate(); // useNavigate 훅을 호출하여 navigate 함수를 얻습니다

    const handleNavigateToInsertForm = () => {
        navigate('/users/insert'); // 버튼 클릭 시 MemberInsertForm으로 이동합니다
    };

    const handGame = {
        title: '맞혀라! 수수께끼',
        desc: '포인트 동작으로 가볍게 배우는 수어',
        img: '/images/main_hand.png',
        url: '/game/hand'
    }
    const soundGame = {
        title: '도전! 소리 탐정',
        desc: '발음이 조금 달라도 소리 탐정에겐 문제 없다',
        img: '/images/main_sound.png',
        url: '/game/sound'
    }
    const lipGame = {
        title: '너의 목소리가 보여',
        desc: '들리지 않아도 알 수 있어요',
        img: '/images/main_lip.png',
        url: '/game/lip'
    }

    return (
        <Box h="2000">
            <Box pb={10} display="flex" justifyContent="space-between" alignItems="center">
                <span>메인 페이지</span>
                <Button onClick={handleNavigateToInsertForm} colorScheme="teal">
                    회원가입
                </Button>
            </Box>
            <Divider mb={10} />
            <HStack spacing={2}>
                <GameCard game={handGame} />
                <GameCard game={soundGame} />
                <GameCard game={lipGame} />
            </HStack>
        </Box>
    );
}

export default MainPage;