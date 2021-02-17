import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';


type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
};

const InputField: React.FC<InputFieldProps> = ({ 
        label, 
        size: _, // it doesn't like prop 'size' for some reason => not passing prop size in, because we won't need it => destructure size out of prop. and rename unused variable to underscore
        ...props
    }) => {
    const [field, { error, }] = useField(props); // special hook from formik.   !! to cast the string to boolean, '' => false, 'error message ...' => true
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} {...props} id={field.name} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};

export default InputField;