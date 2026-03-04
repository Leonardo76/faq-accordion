import {type AccordionElementType} from "../lib/constants.ts";
import {useId, useRef, useState} from 'react';

import {AccordionHeader} from "./AccordionHeader.tsx";
import {AccordionContent} from "./AccordionContent.tsx";
import {AnimatePresence} from "motion/react";

type AccordionProps = {
   data: AccordionElementType[];
   classAccordionContainer?: string;

   classHeaderContainer?: string;
   iconCollapsed: string;
   iconExpanded: string;
   classIconSize?: string;
   classesIconImg?: string;

   classAccordionContent?: string

   getItemId?: (item: AccordionElementType, index: number) => string;
}

export function Accordion({
                             data,
                             classAccordionContainer,
                             iconCollapsed,
                             iconExpanded,
                             classHeaderContainer,
                             classesIconImg,
                             classIconSize = "w-[30px] h-[31px]",
                             classAccordionContent,
                             getItemId
                          }: AccordionProps) {
   const [openElement, setOpenElement] = useState<number | null>(null);
   const [delayedCollapseIndex, setDelayedCollapseIndex] = useState<number | null>(null);
   const collapseTimerRef = useRef<number | null>(null);
   const accordionId = useId();

   function handleToggle(index: number) {
      if (collapseTimerRef.current !== null) {
         window.clearTimeout(collapseTimerRef.current);
         collapseTimerRef.current = null;
      }

      const prevOpen = openElement;

      if (prevOpen === index) {
         setOpenElement(null);
         setDelayedCollapseIndex(null);
         return;
      }

      if (prevOpen !== null && prevOpen !== index) {
         setDelayedCollapseIndex(prevOpen);

         collapseTimerRef.current = window.setTimeout(() => {
            setDelayedCollapseIndex(null);
            collapseTimerRef.current = null;
         }, 220);
      } else {
         setDelayedCollapseIndex(null);
      }

      setOpenElement(index);
   }

   return (
      <section className={classAccordionContainer}>
         {data.map((faq: AccordionElementType, index: number) => {
            const isOpen = openElement === index;

            // stable itemKey (fallback: index)
            const itemKey = getItemId ? getItemId(faq, index) : String(index);

            // use itemKey for a11y ids
            const headerId = `${accordionId}-header-${itemKey}`;
            const panelId = `${accordionId}-panel-${itemKey}`;

            const shouldDelayCollapse = !isOpen && delayedCollapseIndex === index;
            const collapseDelay = shouldDelayCollapse ? 0.16 : 0;

            return (
               <div
                  key={itemKey}
                  className={index !== 0 ? "border-t-[1px] border-divider py-[24px]" : "pb-[24px]"}
               >
                  <AccordionHeader
                     header={faq.header}
                     isOpen={isOpen}
                     handleToggle={() => handleToggle(index)}
                     collapseDelay={collapseDelay}
                     iconCollapsed={iconCollapsed}
                     iconExpanded={iconExpanded}
                     classHeaderContainer={classHeaderContainer}
                     classesIconImg={classesIconImg}
                     classIconSize={classIconSize}
                     headerId={headerId}
                     panelId={panelId}
                  />

                  <AnimatePresence initial={false}>
                     {isOpen && (<AccordionContent
                           content={faq.content}
                           key={`AP${index}`}
                           classAccordionContent={classAccordionContent}
                           headerId={headerId}
                           panelId={panelId}
                        />
                     )}
                  </AnimatePresence>
               </div>
            )
         })}
      </section>
   );
}