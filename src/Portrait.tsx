import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-upright';
import '@fontsource/coming-soon';

const Portrait = ({
    speakingNPC
}: any) => {

return (
        <div className={`absolute m-auto left-[40px] right-0 top-0 bottom-0 w-[300px] h-[300px] bg-cover bg-[url('src/assets/images/characters/${speakingNPC}.jpg')] border-x-[4px] border-y-[4px]`}></div>
    );
}

export default Portrait;