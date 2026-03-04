import {Accordion} from "./Accordion.tsx";
import {faqs} from "../lib/constants.ts";
import star from "../assets/images/icon-star.svg"
import plus from "../assets/images/icon-plus.svg";
import minus from "../assets/images/icon-minus.svg";

type CardProps = {
   classContainer?: string
}

export function Card({classContainer}: CardProps) {
   return (
      // Card
      <div className={classContainer}>
         {/*header*/}
         <section className="flex justify-start items-center gap-[24px]">
            <img src={star} alt="Purple star" className="size-[20.99px] md:size-[40px]"/>
            <h1 className="text-[32px] md:leading-[66%] tracking-[0%] font-bold md:text-[56px] text-faq">
               FAQs
            </h1>
         </section>

         {/*FAQ List*/}
         <Accordion
            data={faqs}
            iconExpanded={minus}
            iconCollapsed={plus}
            getItemId={(item, index) => {
               if (typeof item.header === "string") return item.header;
               return String(index);
            }}
         />
      </div>
   );
}
