import { Box, Button, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();

    const isWithdraw = location.pathname.includes('withdraw');

    return (
        <Box border="1px solid black" borderRadius="md" p={6}>
            <VStack spacing={6}>
                <Text fontSize="4xl" fontWeight="bold">소리·손·글</Text>
                {isWithdraw ? (
                    <>
                        <Text fontSize="xl">회원 탈퇴가 완료되었습니다.</Text>
                        <Text fontSize="md">그동안 이용해주셔서 감사합니다.</Text>
                    </>
                ) : (
                    <>
                        <Text fontSize="xl">회원 가입이 완료되었습니다.</Text>
                        <Text fontSize="md">소리손글 회원가입을 축하드립니다.</Text>
                    </>
                )}
                <Button colorScheme="teal" as={Link} to="/">
                    메인 페이지로
                </Button>
            </VStack>
        </Box>
    );
};

export default SuccessPage;
