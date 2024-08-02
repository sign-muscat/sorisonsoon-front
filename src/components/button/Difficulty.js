import { Box, Flex, HStack, Text } from "@chakra-ui/react";

function Difficulty() {
    const difficulty = 'hard';

    return (
        <Flex borderRadius="md" justifyContent="space-between" mt={5}>
            <Text fontWeight="bold">• 난이도</Text>
            <Flex flexDirection="column">
                <HStack spacing={2} justify="center">
                    <Box w="80px" h="32px" fontSize={14} fontWeight={500}
                         display="flex" alignItems="center" justifyContent="center"
                         bg={difficulty === 'easy' ? 'green.200' : 'gray.200'}
                         borderRadius="md"
                    >
                        쉬움
                    </Box>
                    <Box w="80px" h="32px" fontSize={14} fontWeight={500}
                         display="flex" alignItems="center" justifyContent="center"
                         bg={difficulty === 'medium' ? 'green.200' : 'gray.200'}
                         borderRadius="md"
                    >
                        보통
                    </Box>
                    <Box w="80px" h="32px" fontSize={14} fontWeight={500}
                         display="flex" alignItems="center" justifyContent="center"
                         bg={difficulty === 'hard' ? 'green.200' : 'gray.200'}
                         borderRadius="md"
                    >
                        어려움
                    </Box>
                </HStack>
            </Flex>
        </Flex>
    );
}

export default Difficulty;
