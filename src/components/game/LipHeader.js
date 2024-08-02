import { Badge, Box, HStack, Text } from "@chakra-ui/react";
import { getDifficultyKor } from "../../utils/DifficultyUtils";

function GameHeader({ title, difficulty }) {
    return (
        <Box borderRadius='full' px={4} w='100%'
             bg="linear-gradient(270deg, #9AE6B4 0%, #90CDF4 100%)"
        >
            <HStack color='white' fontWeight={600} spacing={0}>
                <Box flex='1' py={2} px={4}>
                    <Text>{title}</Text>
                </Box>

                <Box flex='1' borderLeft='1px solid white' px={4}>
                    <HStack gap={2} justifyContent='center'>
                        <Text>난이도</Text>
                        <Badge variant='outline' colorScheme='gray'>
                            {getDifficultyKor(difficulty)}
                        </Badge>
                    </HStack>
                </Box>
            </HStack>
        </Box>
    );
}

export default GameHeader;
