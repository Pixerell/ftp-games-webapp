import {Alert} from 'antd';
import './ErrorBlock.css'

const ErrorBlock = ( error : any) => (
    <div className="errorBlock">
        <Alert message="Error has occured" type="error" showIcon
               description={error ? "An error message: " + error.data : ""}
        />
    </div>
);

export default ErrorBlock;
