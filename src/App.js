import './App.css';
import { Card, CardBody, Heading, Divider, Image, Stack, Text, Container, Input } from '@chakra-ui/react'
import { Box, Button } from '@chakra-ui/react'
import { useState } from 'react';

function App() {


  const [username, setUsername] = useState("")
  const [userdata, setUserdata] = useState()

  const getUser = async (username) => {
    const res = await fetch(`https://api.github.com/users/${username}`)
    const data = await res.json();
    console.log(data)
    setUserdata(data)
  }

  return (
    <div className="App">
      <Container maxW='100vw' bg="RGBA(0, 0, 0, 0.06)" h='100vh' display="flex" flexDirection="column" alignItems="center">
        <Box w='100%' p={1} >
          <Heading as='h3' >Find Github user</Heading>
        </Box>
        <Box w='40%' p={4} color='white' css={{
          display: "flex",
          justifyContent: 'space-evenly',
          alignItems: "center"
        }} >
          <Input value={username} color="black" onChange={(e) => setUsername(e.target.value)} placeholder="enter username" w="60%" bg="RGBA(0, 0, 0, 0.16)" border="2px solid blue" />
          <Button colorScheme='blue' onClick={() => getUser(username)} >Search user</Button>
        </Box>

        {
          userdata && userdata ? <>
            <Card maxW='sm'  marginTop="2rem" boxShadow=" 0px 2px 4px rgba(0, 0, 0, 0.4), 0px 7px 13px -3px rgba(0, 0, 0, 0.3), inset 0px -3px 0px rgba(0, 0, 0, 0.2)">
              <CardBody>
                <Image w="70%" h="50%" margin="auto"
                  src={userdata.avatar_url}
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                  <Heading size='md'>Name :  {userdata.name} </Heading>
                  <Heading size='sm' as='i' color='blue.600'>
                    Username : {userdata.login}
                  </Heading>
                  <Heading size='sm' as='i' color='blue.800'>
                    No. of public repos : {userdata.public_repos}
                  </Heading>
                  <Heading size='sm' as='i'>
                    No. of public gists :  {userdata.public_gists}
                  </Heading>
                  <Text color='blue.800'  size='md' as='i' marginTop="1rem" >
                    Profile Created :  {userdata.created_at.slice(0, 4) + "/" + userdata.created_at.slice(5, 7) + "/" + userdata.created_at.slice(8, 10)}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
            </Card>
          </> : <> <Card maxW='sm'>
            <Heading size='lg' p={20}>
              No User data
            </Heading>
          </Card></>
        }
      </Container>
    </div>
  )


}

export default App;
