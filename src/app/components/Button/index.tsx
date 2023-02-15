import { Button } from 'antd';
import React from 'react';
import {HamburgerMenu} from "assets/images/icons/Icons";

const ButtonComponent: React.FC = (props: any) => {
    const {shape, title, icon, onClick} = props;

    const onClickEvent = () => {
      onClick();
    }

    return (
        <>
            <Button type="primary" shape={shape} icon={<HamburgerMenu />} onClick={onClickEvent} >{title}</Button>
        </>
    )
}

export default ButtonComponent;
