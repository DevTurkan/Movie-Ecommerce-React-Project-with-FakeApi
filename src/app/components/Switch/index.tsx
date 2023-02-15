import { Form, Switch } from 'antd';
import React from 'react';

const SwitchComponent: React.FC = (props: any) => {
    const {label, name, rules, checked, onChange} = props;

    const onChangeEvent = (checked: boolean) => {
       onChange(checked);
    }

    return (
        <>
            <Form.Item
                label={label}
                name={name}
                rules={[{ required: rules?.required, message: rules?.message }]}
                className={'switchItem'}
            >
                <Switch checked={checked} onChange={onChangeEvent} className={`switch`}  />
            </Form.Item>
        </>
    )
}

export default SwitchComponent;
