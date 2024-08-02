import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Button, Flex, HStack, Text } from "@chakra-ui/react";

function DifficultyButton({difficulty, handleDifficulty}) {
    return (
        <Flex borderRadius="md" justifyContent="space-between" mt={5}>
            <Text fontWeight="bold">• 난이도</Text>
            <Flex flexDirection="column">
                <HStack spacing={2} justify="center">
                    <Button w="80px" h="32px" fontSize={14} fontWeight={500}
                            value="easy" onClick={handleDifficulty}
                            variant={difficulty === 'easy' ? 'mint' : 'gray'}
                    >
                        쉬움
                    </Button>
                    <Button w="80px" h="32px" fontSize={14} fontWeight={500}
                            value="medium" onClick={handleDifficulty}
                            variant={difficulty === 'medium' ? 'mint' : 'gray'}
                    >
                        보통
                    </Button>
                    <Button w="80px" h="32px" fontSize={14} fontWeight={500}
                            value="hard" onClick={handleDifficulty}
                            variant={difficulty === 'hard' ? 'mint' : 'gray'}
                    >
                        어려움
                    </Button>
                </HStack>

                <Flex mt={3}>
                    <InfoOutlineIcon mr={2}/>
                    <Text whiteSpace="pre-wrap" fontSize="12" fontWeight="500">
                        쉬움은 1~2단계, 보통은 3~4단계, 어려움은 5~6단계로{"\n"}
                        이루어진 수어가 출제됩니다.
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default DifficultyButton;