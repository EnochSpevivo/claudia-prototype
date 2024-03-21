import { useState } from 'react'
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-upright';
import '@fontsource/coming-soon';

const ContinueButton = ({
    setHasContinued,
    setIsContinueNecessary,
    currentNode,
    setCurrentNode,
    currentArea,
    renderedNodes,
    setRenderedNodes,
}: any) => {
    return (<div onClick={() => {
        const newCurrentNode = currentArea.nodes.find((node: any) => node.id === currentNode.nextNodeId);

        setHasContinued(true);
        setIsContinueNecessary(false);
        setCurrentNode(newCurrentNode);
        setRenderedNodes(renderedNodes.concat(newCurrentNode));
}} className="font-semibold mt-[20px] bg-[#ff471a] hover:bg-[#CD5C5C] cursor-pointer p-1 transition transition-all duration-300">CONTINUE ➤</div>);
} 

export default ContinueButton;