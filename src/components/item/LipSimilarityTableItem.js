import { Button, Td, Tr } from "@chakra-ui/react";

function LipSimilarityTableItem({data, id}) {

    return (
        <Tr>
            
            
            <Td>{data.answer}</Td>
            <Td>{data.similarity}%</Td>
            <Td>
                <Button size="sm">AI 힌트</Button>
            </Td>
        </Tr>
    );
}

export default LipSimilarityTableItem;