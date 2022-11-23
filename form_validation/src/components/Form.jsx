import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";


export const Form = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [data,setData]  = useState([])

  const name_error = userName === "";
  const email_error = email === "";
  const age_error = age === "";
  const dob_error = dob === "";
  const mobile_error = mobileNumber === "";

  const handleSubmit = (e) => {
    e.preventDefault();
    let regex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(userName&&mobileNumber.length===10&&regex.test(email)&&age>18&&dob){

        const data = {
            userName,
            email,
            age,
            dob,
            mobileNumber
        };
        const payload = JSON.stringify(data)
        postData(payload)
    };

}

  const postData = (payload)=>{
    
    fetch("https://json-server-mocker-app.herokuapp.com/form",{
      method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:payload
    })
    .then((res)=>res.json())
    .then(()=>{
      alert("Registered Successfully")
    })
    .catch((err)=>console.log(err))
  }

  const getData = ()=>{
      fetch("https://json-server-mocker-app.herokuapp.com/form")
      .then((res)=>res.json())
      .then((res)=>setData(res))
      .catch((err)=>console.log(err))
  }

  useEffect(()=>{
    getData()
  },[])

 

  return (
    <>
     <Box boxShadow="dark-lg" p={8}>
     <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          <Box>
            <FormControl isInvalid={name_error}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Full name"
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                value={userName}
              />
              {!name_error ? (
                <FormHelperText>Enter your name</FormHelperText>
              ) : (
                <FormHelperText>Name is required</FormHelperText>
              )}
              {userName.length > 5 ? (
                <FormHelperText>Maximum 5 characters is allowed</FormHelperText>
              ) : (
                <></>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl isInvalid={age_error}>
              <FormLabel>Age</FormLabel>
              <Input
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
                type="number"
                value={age}
              />
              {!age_error ? (
                <FormHelperText>Enter your age</FormHelperText>
              ) : (
                <FormHelperText>Age is Required</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl isInvalid={email_error}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
              />
              {!email_error ? (
                <FormHelperText>Enter your email address</FormHelperText>
              ) : (
                <FormHelperText>Email address is Required</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl isInvalid={dob_error}>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                placeholder="Date of Birth"
                onChange={(e) => setDob(e.target.value)}
                type="date"
                value={dob}
              />
              {!dob_error ? (
                <FormHelperText>select your Date of Birth</FormHelperText>
              ) : (
                <FormHelperText>Date of Birth is Required</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl isInvalid={mobile_error} isRequired={dob}>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                placeholder="Mobile number"
                onChange={(e) => setMobileNumber(e.target.value)}
                type="number"
                maxLength="10"
                value={mobileNumber}
              />
              {!mobile_error ? (
                <FormHelperText>Enter your moblie number</FormHelperText>
              ) : (
                <FormHelperText>Mobile number is Required</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box>
            <Button type="submit" isDisabled={
                userName.length>5 && age<18 && !email && !mobileNumber && !dob     
            }>SUBMIT</Button>
          </Box>
        </Stack>
      </form>
     </Box>


      <Box mt={10}>
          <TableContainer>
            <Table variant='simple'>
                 <Thead>
                    <Tr>
                       <Th>S.no</Th>
                       <Th>Username</Th>
                       <Th>Email</Th>
                       <Th>Age</Th>
                       <Th>Date of Birth</Th>
                       <Th>Mobile Number</Th>
                    </Tr>
                 </Thead>
                 <Tbody>
                   {data&&data.map((e)=>{
                    return<Tr key={e.id}>
                      
                        <Td>{e.id}</Td>
                        <Td>{e.userName}</Td>
                        <Td>{e.email}</Td>
                        <Td>{e.age}</Td>
                        <Td>{e.dob}</Td>
                        <Td>{e.mobileNumber}</Td>
                    
                    </Tr>
                   })}
                 </Tbody>
            </Table>
          </TableContainer>
      </Box>
    </>
  );
};
