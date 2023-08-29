import React from 'react';
import { Skeleton } from 'antd';
import './SkeletonCard.css'
import { ISkeletonCardProps } from "../../helpers/Interfaces"

const SkeletonCard: React.FC<ISkeletonCardProps> = ({ cards }) => {
    const skeletonCards = Array(cards)
        .fill(0)
        .map((_item, index) => (
            <div key={index} className="SkeletonCard">
                <Skeleton.Image active={true} className="SkeletonImg" />
                <Skeleton paragraph={{ rows: 4 }} className="SkeletonBody" active={true} />
            </div>
        ));

    return <>{skeletonCards}</>;
};

export default SkeletonCard;
