import {Alert, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './LoadingBlock.css'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const LoadingBlock = () => (
    <div className="loadingBlock">
        <Alert message="Loading..." type="info" showIcon></Alert>
        <Spin className="spinner" indicator={antIcon} />
    </div>
);

export default LoadingBlock;
