import React, {FC} from "react";

const InfoPanel: FC<InfoPanelPropsType> = ({content, index, subtitle}) => {
    return (
        <div className='container' key={index}>
            <h1>{`The Elder Scrolls ${index + 1}:`}</h1>
            <h2>{subtitle}</h2>
            <hr/>
            <p>{content}</p>
            <hr/>
        </div>
    );
};

export default InfoPanel

export type InfoPanelPropsType = {
    index: number,
    subtitle: string,
    content: string
}

