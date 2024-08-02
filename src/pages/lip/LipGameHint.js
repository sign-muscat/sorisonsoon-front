import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Badge,
    Box,
    HStack,
    Text
} from "@chakra-ui/react";
import IonIcon from "@reacticons/ionicons";

function LipGameHint() {
    return (
        <>
            <Accordion allowToggle mt={4}>
                <AccordionItem border={0}>
                    <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
                        <AccordionButton justifyContent='space-between' alignItems='center'>
                            <Box p='2' fontWeight={600} color='gray.600'>
                                <HStack>
                                    <Box color='blue.400'>
                                        <IonIcon name={"bulb-outline"}/>
                                    </Box>
                                    <Text>AI에게 힌트 듣기</Text>
                                </HStack>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4} borderTop='1px solid' borderColor='gray.200'>
                            <Box p='2'>
                                힌트 텍스트
                            </Box>
                        </AccordionPanel>
                    </Box>
                </AccordionItem>
            </Accordion>

            <Accordion allowToggle mt={4}>
                <AccordionItem border={0}>
                    <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
                        <AccordionButton justifyContent='space-between' alignItems='center'>
                            <Box p='2' fontWeight={600} color='gray.600'>
                                <HStack>
                                    <Box color='yellow.400'>
                                        <IonIcon name={"diamond"} />
                                    </Box>
                                    <Text>AI에게 힌트 듣기</Text>
                                    <Badge colorScheme='orange'>PREMIUM</Badge>
                                </HStack>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4} borderTop='1px solid' borderColor='gray.200'>
                            <Box p='2'>
                                힌트 텍스트
                            </Box>
                        </AccordionPanel>
                    </Box>
                </AccordionItem>
            </Accordion>
        </>
    );
}

export default LipGameHint;
