import { Form, Input } from 'antd';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React, {useEffect} from 'react';
import MaskedInput from "react-text-mask";

const phoneNumberMask = [
    '+',
    '9',
    '9',
    '4',
    ' ',
    "(",
    /[1-9]/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/
];

const InputField: React.FC = (props: any) => {
    const {label, name, rules, placeholder, onChange, className, type, value, readOnly} = props;


    const onChangeEvent = (e) => {
        //onChange();


    }

    return (
        <>
            <Form.Item
                label={label}
                name={name}
                rules={[
                    //{ type: rules?.type ?? 'text', message: rules?.type_message ?? ''},
                    { required: rules?.required, message: rules?.message }
                ]}
                shouldUpdate={(prevValues, curValues) => {
                    return prevValues!== curValues;
                }}
            >
                {
                    type=='password' ? <Input.Password
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        placeholder={placeholder}
                        onChange={onChangeEvent}
                        className={className}
                    /> : type=='tel' ? <MaskedInput
                        mask={phoneNumberMask}
                        className={`ant-input ${className}`}
                        placeholder={placeholder}
                        guide={true}
                        onChange={onChangeEvent}
                    /> : <Input
                        type={type ?? 'text'}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChangeEvent}
                        className={className}
                        readOnly={readOnly ?? false}
                    />
                }
            </Form.Item>
        </>
    )
}

export default InputField;
