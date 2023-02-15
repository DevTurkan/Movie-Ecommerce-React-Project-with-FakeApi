import { Form, Input } from 'antd';
import React from 'react';

const TextAreaField: React.FC = (props: any) => {
    const {label, name, rules, placeholder, onChange, className} = props;

    const onChangeEvent = () => {
        //onChange();
    }

    return (
        <>
            <Form.Item
                label={label}
                name={name}
                rules={[{ required: rules?.required, message: rules?.message }]}
            >
                <Input.TextArea placeholder={placeholder}  onChange={onChangeEvent} className={`textarea ${className}`} />
            </Form.Item>
        </>
    )
}

export default TextAreaField;
