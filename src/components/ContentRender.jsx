import React from 'react';

const ContentRender = ({ content, className }) => {
    return <p className={className}>
        {content.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ))}
    </p>
};

export default ContentRender;
