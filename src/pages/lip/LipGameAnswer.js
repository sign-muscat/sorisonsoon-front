import { Box, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

function LipGameAnswer({ handleSubmit, setAnswer, answer }) {

    const onChangeLip = (e) => setAnswer(e.target.value);

    const LipClickPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 폼 제출 방지
            handleSubmit();
        }
    };

    return (
        <Box mb={2}>
            <InputGroup size='md' mb={4} mt={4}>
                <Input
                    pr='4.5rem'
                    placeholder='추측한 답안을 작성하세요.'
                    fontSize='15px'
                    value={answer}
                    onChange={onChangeLip}
                    onKeyDown={LipClickPress}
                />
                <InputRightElement width='5.25rem'>
                    <Button h='1.75rem' size='sm' onClick={handleSubmit}>제출하기</Button>
                </InputRightElement>
            </InputGroup>
        </Box>
    );
}

export default LipGameAnswer;
