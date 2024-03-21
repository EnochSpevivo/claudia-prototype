import { useState, useEffect, useRef } from 'react'

import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-upright';
import '@fontsource/coming-soon';

import content from "./assets/content.json";

import ContinueButton from './ContinueButton';
import Portrait from './Portrait';
import Option from './Option';

function App() {
  const [isContinueNecessary, setIsContinueNecessary] = useState(false);
  const [hasContinued, setHasContinued] = useState(false);
  const [currentNode, setCurrentNode] = useState();
  const [renderedNodes, setRenderedNodes] = useState([]);
  const [speakingNPC, setSpeakingNPC] = useState();
  const logRef = useRef(null)

  const currentArea = content.areas.find((area) => area.id === 1);

  const handleOptionSelect = (option: any) => {
    const responseNode = {
      "speaker": "You",
      "speakerSlug": "pc",
      "text": [option.text],
    };

    option.chosen = true;

    const newCurrentNode = currentArea?.nodes.find((node) => node.id === option.nextNodeId);
    setCurrentNode(newCurrentNode);

    setRenderedNodes(renderedNodes.concat([responseNode, newCurrentNode]));
  }

  const scrollToBottom = () => {
    // TODO: deeply inelegant way to scroll to the bottom of the chat log automatically
    setTimeout(() => logRef.current?.scrollTo(0, 10000), 10);
  }

  const handleRenderNode = (node: any) => {
    let renderedNode = [];
    const isCurrentNode = node.id === currentNode.id;

    if (!node.speaker) {
      renderedNode = node.text.map((text: string) => <p className={!isCurrentNode ? 'opacity-60' : ''}>{text}</p>);
    } else if (node.speaker) {
      if (!speakingNPC && speakingNPC !== node.speakerSlug) {
        setSpeakingNPC(node.speakerSlug);
      };

      if (node?.text?.length) {
        renderedNode = node.text.map((text: string, index: number) => {
          if (index === 0) {
            return (<>
                <p className={`${!isCurrentNode ? 'opacity-60' : ''} mt-[20px]`}>
                  <span className="uppercase">{node.speaker} — </span><span className={node.speakerSlug}>"{text}"</span>
                </p>
              </>
            );
          } else if (index >= 1) {
            return (<>
                <p className={`${!isCurrentNode ? 'opacity-60' : ''} mt-[20px]`}>
                  <span className={node.speakerSlug}>"{text}"</span>
                </p>
              </>
            );
          }
        });
      } 
      
      if (node.options?.length) {
        if (node.id === currentNode?.id) {
          renderedNode.push(
            <ol className="pc mt-[20px] ml-[20px] list-decimal text-[16px] text-[#ff471a] cursor-pointer">
              {node.options.map((option: string) => {
                return <Option option={option} handleOptionSelect={handleOptionSelect} />
              })}
            </ol>
          );
        }
      }

      if (node.optionNodeId) {
        if (node.id === currentNode?.id) {
          const currentOptionNode = currentArea?.nodes.find((currentAreaNode) => currentAreaNode.id === node.optionNodeId);

          renderedNode.push(
            <ol className="pc mt-[20px] ml-[20px] list-decimal text-[16px] text-[#ff471a] cursor-pointer">
              {currentOptionNode.options.map((option: string) => {
                return <Option chosen={option.chosen} option={option} handleOptionSelect={handleOptionSelect} />
              })}
            </ol>
          );
        }
      }
    }

    // NOTE: only show a continue if the current node has "continue === true"
    if ((node.id === currentNode?.id) && currentNode?.continue && !isContinueNecessary) {
      setHasContinued(false);
      setIsContinueNecessary(true);
    }
  
    scrollToBottom();
    return renderedNode;
  }

  useEffect(() => {
    // TODO: fix typescript errors
    if (!currentNode && !renderedNodes.length && currentArea) {
      setCurrentNode(currentArea.nodes[0]);
      setRenderedNodes([currentArea.nodes[0]]);
    }
  }, [renderedNodes]);

  return (
    <div className="bg-[url('src/assets/images/bgs/train-tracks.jpeg')] bg-cover bg-no-repeat w-screen h-screen">
      <div className="relative left-[100px] max-w-[520px] pt-[30px] pb-[50px] px-[50px] h-screen bg-black bg-opacity-80 border-x-[8px] overflow-y-scroll" ref={logRef}>
        <h1 className="text-3xl capitalize">
          {currentArea?.name}
        </h1>

        {renderedNodes.length && renderedNodes.map((renderedNode) => handleRenderNode(renderedNode))}

        {(isContinueNecessary && !hasContinued) && <ContinueButton setHasContinued={setHasContinued} currentNode={currentNode} setCurrentNode={setCurrentNode} currentArea={currentArea} renderedNodes={renderedNodes} setRenderedNodes={setRenderedNodes} setIsContinueNecessary={setIsContinueNecessary} />}
        

        {/* <p className="mt-[20px]">
          <span className="beckett">"To you then, Kindred, I pose this question: What is the elephant?"</span>
        </p> */}
      </div>

      {speakingNPC && <Portrait speakingNPC={speakingNPC} />}

    </div>
  )
}

export default App
