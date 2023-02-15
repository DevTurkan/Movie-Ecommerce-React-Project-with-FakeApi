// import React from 'react'
// function ButtonComponentone(props) {
//   const {children, firstClick} = props;
//   return (
//     <button onClick={firstClick}>
//         {children}
//     </button>
//   )
// }
// export default ButtonComponentone


import React from 'react';
const ButtonComponentone: React.FC = (props: any) => {
    const {title, firstClick}: {title: any, firstClick: any} = props;

    return (
        <>
            <button onClick={firstClick} >{title}</button>
        </>
    )
}

export default ButtonComponentone;
