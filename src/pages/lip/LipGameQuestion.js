import { Box, Center } from '@chakra-ui/react'; // @chakra-ui/react 사용 예시
import IonIcon from "@reacticons/ionicons";
import React, { useState } from 'react';

function LipGameQuestion() {
    const [showImage, setShowImage] = useState(false);

    return (
        <Box borderWidth='1px' borderRadius='lg' my={4}>
            {showImage ? (
                <img 
                    src="/images/sample.gif" 
                    alt="Sample" 
                    style={{ width: '100%', height: 'auto' }} 
                />
            ) : (
                <Center color='red.400' py={10}>
                    <IonIcon 
                        name='play-circle' 
                        style={{ fontSize: 64 }} 
                        onClick={() => setShowImage(true)} 
                    />
                </Center>
            )}
        </Box>
    );
}

export default LipGameQuestion;
