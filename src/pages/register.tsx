import React from 'react';
import { Formik, Form } from "formik";
import { Wrapper } from '../components/Wrapper';
import InputField from '../components/InputField';
import { Box, Button } from '@chakra-ui/react';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {

}

const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter();
    const [, register] = useRegisterMutation(); // generated custom hook
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ email: "", username: "", password: "" }}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register({options: values}); // names are matching; {username: values.username} / stop spinning when promise is resolved
                    if (response.data?.register.errors) { // optional chaining
                        [{field: "username", message: "something is wrong"}]
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if (response.data?.register.user) {
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name='username'
                            placeholder='username'
                            label='Username'
                        />
                        <Box mt={4}>
                            <InputField
                                name='email'
                                placeholder='email'
                                label='email'
                                type='email'
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                name='password'
                                placeholder='password'
                                label='Password'
                                type='password'
                            />
                        </Box>
                        <Button 
                            mt={4} 
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            register
                        </Button>

                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(Register);