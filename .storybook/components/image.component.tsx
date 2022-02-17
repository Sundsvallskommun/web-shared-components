import React from 'react';

export function Image({
    src,
    ...props
}) {

    return (
        <>
            <img src={src} {...props}/>
        </>
    );
}
