import React, { useState } from 'react';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import InputField from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from 'next/link';



const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ newPassword: ""}}
                onSubmit={async (values, { setErrors }) => {
                    const response = await changePassword({
                        newPassword: values.newPassword, 
                        token,
                    });
                    if (response.data?.changePassword.errors) { 
                        const errorMap = toErrorMap(response.data.changePassword.errors);
                        if ('token' in errorMap) {
                            setTokenError(errorMap.token);
                            // handle token errors differently
                        }
                        setErrors(errorMap);
                    } else if (response.data?.changePassword.user) {
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name='newPassword'
                            placeholder='new password'
                            label='New Password'
                            type="password"
                        />
                        {tokenError ? 
                            <Flex>
                                <Box>
                                    <Box mr={2} color='tomato'>{tokenError}</Box>
                                    <NextLink href="/forgot-password">
                                        <Link>go get a new one</Link>
                                    </NextLink>
                                </Box>
                            </Flex>
                        : null}
                        <Button 
                            mt={4} 
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            submit new password
                        </Button>

                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

ChangePassword.getInitialProps = ({ query }) => { // !!!!!
    return {
        token: query.token as string,
    };
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);