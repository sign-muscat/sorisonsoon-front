import { Badge, Box, HStack, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react";
import IonIcon from "@reacticons/ionicons";
import LipSimilarityTableItem from "../item/LipSimilarityTableItem";

function LipSimilarityTable({ dataList }) {
    return (
        <Box border='1px' borderColor='gray.200' borderRadius='md' mt={4}>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr fontWeight={600} color='gray.700'>
                            <Td>제출한 답안</Td>
                            <Td>유사도</Td>
                            <Td>
                                <HStack>
                                    <Box color='yellow.400'>
                                        <IonIcon name={"diamond"} />
                                    </Box>
                                    <Text>AI 힌트</Text>
                                    <Badge colorScheme='orange'>PREMIUM</Badge>
                                </HStack>
                            </Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dataList.length > 0 ? (
                            dataList.map((data, index) => (
                                <LipSimilarityTableItem key={index} data={data} id={index + 1} />
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={3}>아직 제출한 답안이 없습니다.</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default LipSimilarityTable;
