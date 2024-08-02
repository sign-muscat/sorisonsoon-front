import { Box, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

function MemberInsertForm() {
  return (
    <Box p={4}>
      <h1>회원 가입</h1>
      <Button as={Link} to="/users/corporate" colorScheme="teal" mr={4}>
        기업/단체 가입
      </Button>
      <Button as={Link} to="/users/individual" colorScheme="teal">
        개인 가입
      </Button>
    </Box>
  );
}

export default MemberInsertForm;
