import { Form, Checkbox } from 'antd';
import React, {useState} from 'react';

const CheckboxComponent: React.FC = (props: any) => {
    const {label, name, rules, onChange} = props;
    const [checked, setChecked] = useState(props.checked ?? false)

    const onChangeEvent = (checked: boolean) => {
       // onChange(checked);

        setChecked(!checked)
    }

    return (
        <>
            <Form.Item
                name={name}
                rules={[{ required: rules?.required, message: rules?.message }]}
                className={'switchItem'}
            >
                <Checkbox
                    defaultChecked={props.checked}
                    className={`checkbox`}
                    onChange={onChangeEvent}
                >{label}</Checkbox>
            </Form.Item>
        </>
    )
}

export default CheckboxComponent;
