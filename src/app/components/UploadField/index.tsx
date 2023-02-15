import { Form, Button,  Upload } from 'antd';
import React from 'react';
import {UploadArrow} from "assets/images/icons/Icons";

const UploadField: React.FC = (props: any) => {
    const {label, name, rules, desc, showUploadList, onChange} = props;

    const onChangeEvent = (info: any) => {
        //console.log(info)
        //onChange(info);
    }

    return (
        <>
            <Form.Item
                name={name}
                rules={[{ required: rules?.required, message: rules?.message }]}
                className={`uploadArea`}
            >
                <Upload
                    name={name}
                    onChange={onChangeEvent}
                    showUploadList={showUploadList}
                    accept={'.png, .jpg, .jpeg'}
                    listType={"picture"}
                    multiple={true}
                    beforeUpload={()=> {
                            return false;
                        }
                    }
                >
                    <Button className={'flex align_center '} icon={<UploadArrow />}>
                        {label}
                    </Button>
                    <p>{desc}</p>
                </Upload>
            </Form.Item>
        </>
    )
}

export default UploadField;
