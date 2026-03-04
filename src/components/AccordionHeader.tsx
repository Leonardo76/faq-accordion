import {motion} from "framer-motion";
import type {ReactNode} from "react";
import classNames from "classnames";

type AccordionHeaderProps = {
   handleToggle: () => void;
   isOpen: boolean;
   collapseDelay: number;
   iconCollapsed: string;
   iconExpanded: string;
   header: ReactNode;
   classHeaderContainer?: string;
   classIconSize?: string;
   classesIconImg?: string;
   headerId: string;
   panelId: string;
}

export function AccordionHeader({
                                   handleToggle,
                                   isOpen,
                                   collapseDelay,
                                   iconCollapsed,
                                   iconExpanded,
                                   header,
                                   classHeaderContainer = "",
                                   classIconSize = "w-[30px] h-[31px]",
                                   classesIconImg = "",
                                   headerId,
                                   panelId,
                                }: AccordionHeaderProps) {
   return (
      <button
         id={headerId}
         type="button"
         onClick={handleToggle}
         className={classNames(
            "flex items-center justify-between gap-[24px] text-left w-full",
            "text-[16px] font-bold",
            "text-question",
            "hover:text-question-active active:text-question-active",
            classHeaderContainer
         )}
         aria-controls={panelId}
         aria-expanded={isOpen}
      >
         {header}
         <motion.span
            className={classNames("relative shrink-0 inline-block",
               classIconSize)}
            animate={{rotate: isOpen ? 180 : 0}}
            transition={{
               duration: 0.9,
               ease: [0.22, 1, 0.36, 1],
               delay: isOpen ? 0 : collapseDelay,
            }}
         >
            <motion.img
               src={iconCollapsed}
               alt="Plus sign"
               className={classNames("absolute inset-0",
                  classIconSize,
                  classesIconImg)}
               animate={{opacity: isOpen ? 0 : 1}}
               transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: isOpen ? 0 : collapseDelay,
               }}
            />
            <motion.img
               src={iconExpanded}
               alt="Minus sign"
               className={classNames("absolute inset-0",
                  classIconSize,
                  classesIconImg)}
               animate={{opacity: isOpen ? 1 : 0}}
               transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: isOpen ? 0 : collapseDelay,
               }}
            />
         </motion.span>
      </button>
   );
}
