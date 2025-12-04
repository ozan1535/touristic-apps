import { Accordion } from "@radix-ui/react-accordion";
import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

function TravelPlans({ travelPlans }) {
  return (
    <>
      <p className="p-2 bg-blue-500 font-bold rounded text-white">Your Travel Plans</p>
      <Accordion type="single" collapsible>
        {travelPlans.map((item, index) => (
          <AccordionItem value={item.id} key={index}>
            <AccordionTrigger className="ring-0 focus-visible:ring-0 focus-visible:border-none">
              Your {item.destination} Travel Plan
            </AccordionTrigger>
            <AccordionContent>
              <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                <div
                  className="prose prose-indigo max-w-none prose-headings:text-indigo-700 prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-indigo-600"
                  dangerouslySetInnerHTML={{ __html: item.ai_response }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default TravelPlans;
