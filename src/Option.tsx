import { useState } from 'react'
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-upright';
import '@fontsource/coming-soon';

const Option = ({ 
    option, 
    handleOptionSelect,
    chosen,
}: any) => {
    return (<li className={`${chosen ? 'opacity-60' : ''} hover:text-[#ffad99] transition transition-all duration-300`} onClick={() => handleOptionSelect(option)}>{option.text}</li>)
}

export default Option;