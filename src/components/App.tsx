import {Card} from "./Card.tsx";
import bgMobile from "../assets/images/background-pattern-mobile.svg";
import bgDesktop from "../assets/images/background-pattern-desktop.svg";

function App() {

   return (
       <main className="relative min-h-screen bg-app-bg flex flex-col items-center justify-center px-[24px] md:px-[84px] lg:px-[420px]">
         <picture className="absolute inset-x-0 top-0 z-0 block w-full h-[232px] md:h-[320px]">
            <source srcSet={bgDesktop} media="(min-width: 768px)"/>
            <img
               src={bgMobile}
               alt="Purple background pattern"
               className="w-full block h-auto"
            />
         </picture>

         {/*top-[130.5px]*/}
         <article className="relative z-10 w-full max-w-[600px]">
            <Card classContainer="flex flex-col gap-[24px] md:gap-[32px] p-[24px] md:p-[40px] rounded-[8px] md:rounded-[16px] bg-card-bg relative z-10 w-full"/>
         </article>
      </main>
   )
}

export default App
