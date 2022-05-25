import React, {ChangeEvent, FC, useRef} from 'react';

const FileUpload:FC<FileUploadProps> = ({accept, children, setFile}) => {
    const ref = useRef<HTMLInputElement>()
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0])
    }
    return (
        <div
            onClick={() => {ref.current.click()}}
            style={{display: 'flex', alignSelf: 'center'}}
        >
            <input
                type="file"
                accept={accept}
                style={{display: 'none'}}
                ref={ref}
                onChange={onChange}
            />
            {children}
            
        </div>
    );
};

export default FileUpload;

interface FileUploadProps {
    setFile: Function;
    accept: string;
    children?: React.ReactNode;
}