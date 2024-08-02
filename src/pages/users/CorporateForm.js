import { Box, Button, FormControl, FormLabel, HStack, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
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
        verificationCode: '',
        zipCode: '' // 우편번호 필드 추가
    });

    const [modalState, setModalState] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8070/api/members/new', formData);
            alert('회원 가입이 완료되었습니다.');
        } catch (error) {
            alert('회원 가입에 실패했습니다. : ' + (error.response?.data || 'Unknown error'));
        }
    };

    const requestVerification = () => {
        alert('인증 요청을 처리합니다.');
    };

    const verifyCode = () => {
        alert('인증 코드를 확인합니다.');
    };

    const searchAddress = () => {
        setModalState(true);
    };

    const postCodeStyle = {
        width: '400px',
        height: '400px',
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%, 0)',
        zIndex: 9999, // 높은 zIndex 값으로 설정
        display: modalState ? 'block' : 'none',
    };

    const onCompletePost = (data) => {
        setModalState(false);
        setFormData({
            ...formData,
            address: data.address,
            zipCode: data.zonecode // 우편번호 업데이트
        });
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                <FormControl mb={3}>
                    <FormLabel htmlFor="companyName">회사명</FormLabel>
                    <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="회사명" />
                </FormControl>

                <FormControl mb={3}>
                    <FormLabel htmlFor="businessNumber">사업자 번호</FormLabel>
                    <HStack>
                        <Input id="businessNumber" name="businessNumber" value={formData.businessNumber} onChange={handleChange} placeholder="사업자 번호" />
                        <Button onClick={requestVerification}>인증 요청</Button>
                    </HStack>
                </FormControl>

                <FormControl mb={3}>
                    <FormLabel htmlFor="verificationCode">인증번호</FormLabel>
                    <HStack>
                        <Input id="verificationCode" name="verificationCode" value={formData.verificationCode} onChange={handleChange} placeholder="인증번호" />
                        <Button onClick={verifyCode}>인증 확인</Button>
                    </HStack>
                </FormControl>

                <FormControl mb={3}>
                    <FormLabel htmlFor="industry">업종</FormLabel>
                    <Input id="industry" name="industry" value={formData.industry} onChange={handleChange} placeholder="업종" />
                </FormControl>

                <FormControl mb={3}>
                    <FormLabel htmlFor="zipCode">우편번호</FormLabel>
                    <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        placeholder="우편번호"
                        type="text"
                        readOnly // 사용자가 직접 수정할 수 없게 설정
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
                            readOnly // 사용자가 직접 수정할 수 없게 설정
                        />
                        <Button onClick={searchAddress}>주소 검색</Button>
                    </HStack>
                </FormControl>

                <FormControl mb={3}>
                    <FormLabel htmlFor="detailedAddress">상세주소</FormLabel>
                    <Input id="detailedAddress" name="detailedAddress" value={formData.detailedAddress} onChange={handleChange} placeholder="상세주소" />
                </FormControl>

                <FormControl mb={3}>
                    <FormLabel htmlFor="contactPerson">담당자명</FormLabel>
                    <Input id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="담당자명" />
                </FormControl>

                <HStack spacing={4}>
                    <Button mt={4} colorScheme="teal" type="submit">회원가입</Button>
                    <Button mt={4} colorScheme="blue">
                        <Link to="/users/insert">이전으로</Link>
                    </Button>
                </HStack>

                {modalState && (
                    <div style={{position: 'relative', zIndex: 9998}}>
                        <DaumPostcode
                            style={postCodeStyle}
                            onComplete={onCompletePost}
                        />
                    </div>
                )}
            </form>
        </Box>
    );
}

export default CorporateForm;
