import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import QuestionTable from "../../components/table/QuestionTable";
import RegistRank from "../../components/button/RegistRank";

function HandGameFinish({questionList, difficulty}) {
    const navigate = useNavigate();

    const getCorrectNum = (questions) => {
        let count = 0;
        questions.forEach(question => {
            if (question.isCorrect === true) count++;
        })
        return count;
    }
    const correctNum = getCorrectNum(questionList);
    const totalNum = questionList.length;

    return (
        <>
            <Box m='5' mt='10'>
                <Text fontSize='xl' fontWeight='700'>
                    🥳 맞춘 문제 ({correctNum}/{totalNum})
                </Text>
                <Text fontSize='md'>
                    이번 게임을 통해 아래 단어들을 배웠어요.
                </Text>
            </Box>
            <QuestionTable questionList={questionList}/>
            <Flex justifyContent='flex-end' my={30} mr={4}>
                <Button colorScheme='gray' size='sm' mx='5px' onClick={() => navigate('/')}>
                    메인으로
                </Button>
                <RegistRank difficulty={difficulty} correctNum={correctNum} questionList={questionList}/>
            </Flex>
        </>
    );
}

export default HandGameFinish;