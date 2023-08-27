import {FloatButton} from "antd";
import { UpOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import FloaterLogic from "./FloaterLogic";
import './FloatingButton.css'

export default function Floater() {

    const { handleClick } = FloaterLogic();

    return (
            <FloatButton className="FloatingButton"
                shape="circle"
                type="primary"
                style={{ right: 95 }}
                icon={window.location.pathname === '/' ? <UpOutlined /> : <ArrowLeftOutlined />}
                onClick={handleClick}
            />
    )
}