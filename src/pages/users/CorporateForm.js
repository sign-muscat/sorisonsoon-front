import { Box, Button, FormControl, FormLabel, HStack, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Link } from 'react-router-dom';

function CorporateForm() {
    const [formData, setFormData] = useState({
        companyName: '',
        businessNumber: '',
        industry: '',
        address: '',
        detailedAddress: '',
        contactPerson: '',
        zipCode: '',
        type: 'ENTERPRISE'
    });

    const [isValidBusinessNumber, setIsValidBusinessNumber] = useState(false);
    const [modalState, setModalState] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidBusinessNumber) {
            alert('유효한 사업자 번호를 입력해 주세요.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/vi/users/new', formData);
            alert('회원 가입이 완료되었습니다.');
        } catch (error) {
            alert('회원 가입에 실패했습니다. : ' + (error.response?.data || 'Unknown error'));
        }
    };

    const searchAddress = () => {
        setModalState(true);
    };

    const postCodeStyle = {
        width: '400px',
        height: '400px',
        zIndex: 9999,
        display: modalState ? 'block' : 'none',
    };

    const onCompletePost = (data) => {
        setModalState(false);
        setFormData({
            ...formData,
            address: data.address,
            zipCode: data.zonecode
        });
    };

    const handleEscKey = useCallback((e) => {
        if (e.key === 'Escape') {
            setModalState(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [handleEscKey]);

    const handleCheckBusinessNumber = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/check-business-number?businessNumber=${formData.businessNumber}`);
            const isValid = response.data;
            setIsValidBusinessNumber(isValid);
        } catch (error) {
            console.error('Error checking business number:', error);
            setIsValidBusinessNumber(false);
        }
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                <FormControl mb={3}>
                    <FormLabel htmlFor="companyName">회사명</FormLabel>
                    <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="회사명"
                    />
                </FormControl>

                <FormControl mb={3}>
                    <FormLabel htmlFor="businessNumber">사업자 번호</FormLabel>
                    <HStack>
                        <Input
                            id="businessNumber"
                            name="businessNumber"
                            value={formData.businessNumber}
                            onChange={handleChange}
                            placeholder="사업자 번호"
                        />
                        <Button onClick={handleCheckBusinessNumber}>확인</Button>
                    </HStack>
                </FormControl>

                <FormControl mb={3}>
                    <FormLabel htmlFor="industry">업종</FormLabel>
                    <Input
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        placeholder="업종"
                    />
                </FormControl>

                <FormControl mb={3}>
                    <FormLabel htmlFor="zipCode">우편번호</FormLabel>
                    <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        placeholder="우편번호"
                        type="text"
                        readOnly
                    />
                </FormControl>

                <FormControl mb={3}>
                    <FormLabel htmlFor="address">주소</FormLabel>
                    <HStack>
                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="주소"
                            readOnly
                        />
                        <Button onClick={searchAddress}>주소 검색</Button>
                    </HStack>
                </FormControl>

                <FormControl mb={3}>
                    <FormLabel htmlFor="detailedAddress">상세주소</FormLabel>
                    <Input
                        id="detailedAddress"
                        name="detailedAddress"
                        value={formData.detailedAddress}
                        onChange={handleChange}
                        placeholder="상세주소"
                    />
                </FormControl>

                <FormControl mb={3}>
                    <FormLabel htmlFor="contactPerson">담당자명</FormLabel>
                    <Input
                        id="contactPerson"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="담당자명"
                    />
                </FormControl>

                <HStack spacing={4}>
                    <Button mt={4} colorScheme="teal" type="submit">
                        회원가입
                    </Button>
                    <Button mt={4} colorScheme="blue">
                        <Link to="/users/insert">이전으로</Link>
                    </Button>
                </HStack>

                {modalState && (
                    <Box
                        style={{
                            position: 'fixed',
                            top: '10%',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            zIndex: 9998,
                            border: '1px solid gray',
                            borderRadius: 'md',
                            padding: '1rem',
                            backgroundColor: 'white'
                        }}
                    >
                        <DaumPostcode
                            style={postCodeStyle}
                            onComplete={onCompletePost}
                        />
                    </Box>
                )}
            </form>
        </Box>
    );
}

export default CorporateForm;
