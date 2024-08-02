import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input } from "@chakra-ui/react";
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const IndividualForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        nickname: '',
        password: '',
        confirmPassword: '',
        email: '',
        verificationCode: '' // 이메일 인증 코드
    });

    const [formErrors, setFormErrors] = useState({
        passwordMismatch: false,
        emailInvalid: false,
        emailNotVerified: false
    });

    const [isEmailSent, setIsEmailSent] = useState(false); // 이메일이 발송되었는지 여부

    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const errors = {
            passwordMismatch: formData.password !== formData.confirmPassword,
            emailInvalid: !/\S+@\S+\.\S+/.test(formData.email),
            emailNotVerified: !isEmailSent // 이메일 인증이 완료되지 않은 경우
        };

        setFormErrors(errors);
        return !errors.passwordMismatch && !errors.emailInvalid && !errors.emailNotVerified;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            console.log('Sending data to backend:', formData);
            const response = await axios.post('http://localhost:8040/api/users/new', formData, {
                withCredentials: true // 자격 증명을 포함
            });
            console.log('Response:', response.data);
            navigate('/success'); // 회원가입 성공 후 이동할 페이지
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert('회원 가입에 실패했습니다. : ' + error.response.data);
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('회원 가입에 실패했습니다. 서버 응답이 없습니다.');
            } else {
                console.error('Error message:', error.message);
                alert('회원 가입에 실패했습니다. : ' + error.message);
            }
        }
    };

    const handleSendVerificationEmail = async () => {
        try {
            const response = await axios.post('http://localhost:8040/api/users/mailConfirm', {
                email: formData.email
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' // 서버 응답으로 JSON을 기대
                },
                withCredentials: true
            });

            const { data, status } = response; // 응답 데이터와 상태 코드 추출

            if (status >= 200 && status < 300) {
                // 응답 본문을 확인하여 성공적인 응답인지 확인
                if (data.success) {
                    setIsEmailSent(true);
                    alert('인증 메일이 발송되었습니다. 메일을 확인하여 인증 코드를 입력해 주세요.');
                } else {
                    console.error('Unexpected response data:', data);
                    alert('인증 메일 발송에 실패했습니다. 서버 응답 데이터: ' + data.message);
                }
            } else {
                console.error('Unexpected response status:', status);
                alert('인증 메일 발송에 실패했습니다. 서버 응답 상태 코드: ' + status);
            }
        } catch (error) {
            // 상태 코드 403 처리
            if (error.response && error.response.status === 403) {
                console.error('Access forbidden:', error.response.data);
                alert('인증 메일 발송에 실패했습니다. 권한이 없습니다.');
            } else {
                const errorMessage = error.response?.data?.message || error.message;
                console.error('Error:', errorMessage);
                alert('인증 메일 발송에 실패했습니다. : ' + errorMessage);
            }
        }
    };

    const handleVerifyCode = async () => {
        try {
            const response = await axios.post('http://localhost:8040/api/users/verifyCode', {
                code: formData.verificationCode
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            // 응답 데이터를 콘솔에 출력하여 확인
            console.log('Server response:', response.data);

            // 응답 데이터가 성공적이며, 유효한 인증 코드인 경우
            if (response.data.success && response.data.data.valid) {
                setFormErrors({
                    ...formErrors,
                    emailNotVerified: false
                });
                alert('이메일 인증이 완료되었습니다.');
            } else {
                // 응답 데이터가 성공적이지 않거나 유효하지 않은 인증 코드인 경우
                setFormErrors({
                    ...formErrors,
                    emailNotVerified: true
                });
                alert('인증 코드가 유효하지 않습니다.');
            }
        } catch (error) {
            // 서버 오류 발생 시 처리
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert('인증 코드 확인에 실패했습니다. : ' + (error.response.data.errorMessage || error.response.data));
            } else {
                console.error('Error message:', error.message);
                alert('인증 코드 확인에 실패했습니다. : ' + error.message);
            }
        }
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                <FormControl mb={4} isRequired>
                    <FormLabel>ID</FormLabel>
                    <Input
                        type="text"
                        name="id"
                        placeholder="ID"
                        value={formData.id}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl mb={4} isRequired>
                    <FormLabel>Nickname</FormLabel>
                    <Input
                        type="text"
                        name="nickname"
                        placeholder="Nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl mb={4} isRequired isInvalid={formErrors.emailInvalid || formErrors.emailNotVerified}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Button mt={2} onClick={handleSendVerificationEmail} colorScheme="teal">
                        인증 메일 보내기
                    </Button>
                    {formErrors.emailInvalid && (
                        <FormErrorMessage>이메일 형식이 올바르지 않습니다.</FormErrorMessage>
                    )}
                    {formErrors.emailNotVerified && (
                        <FormErrorMessage>이메일 인증이 필요합니다.</FormErrorMessage>
                    )}
                </FormControl>
                <FormControl mb={4} isRequired>
                    <FormLabel>인증 코드</FormLabel>
                    <Input
                        type="text"
                        name="verificationCode"
                        placeholder="인증 코드"
                        value={formData.verificationCode}
                        onChange={handleChange}
                    />
                    <Button mt={2} onClick={handleVerifyCode} colorScheme="teal">
                        인증 코드 확인
                    </Button>
                </FormControl>
                <FormControl mb={4} isRequired isInvalid={formErrors.passwordMismatch}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl mb={4} isRequired isInvalid={formErrors.passwordMismatch}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {formErrors.passwordMismatch && (
                        <FormErrorMessage>비밀번호가 일치하지 않습니다.</FormErrorMessage>
                    )}
                </FormControl>
                <HStack spacing={4}>
                    <Button mt={4} colorScheme="teal" type="submit">회원가입</Button>
                    <Button mt={4} colorScheme="blue">
                        <Link to="/users/insert">이전으로</Link>
                    </Button>
                </HStack>
            </form>
        </Box>
    );
};

export default IndividualForm;
