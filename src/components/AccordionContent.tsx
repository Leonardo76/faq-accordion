import {motion} from "framer-motion";
import type {ReactNode} from "react";
import classNames from "classnames";

type AccordionContentProps = {
   content: ReactNode;
   classAccordionContent?: string

   panelId: string;
   headerId: string;
}

export function AccordionContent({content, classAccordionContent = "", panelId, headerId}: AccordionContentProps) {
   return (
      <motion.div
         id={panelId}
         role="region"
         aria-labelledby={headerId}
         initial={{height: 0, opacity: 0}}
         animate={{height: "auto", opacity: 1}}
         exit={{height: 0, opacity: 0}}
         transition={{duration: 0.22, ease: "easeInOut"}}
         className="overflow-hidden"
      >
         <div
            className={classNames(
               "text-[14px] leading-[150%] tracking-normal font-normal text-answer pt-[24px]",
               classAccordionContent)}>
            {content}
         </div>
      </motion.div>
   );
}
