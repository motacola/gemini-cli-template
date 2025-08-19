"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>How does the AI timesheet tool work?</AccordionTrigger>
        <AccordionContent>
          Our AI timesheet tool uses natural language processing to understand what you worked on. Simply type or speak
          what you did, and our AI will categorize your time, assign it to the right projects, and fill out your
          timesheet automatically.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I edit entries after they've been processed?</AccordionTrigger>
        <AccordionContent>
          Yes, you can edit any entry after it's been processed. Our system provides a simple interface to adjust time
          allocations, project assignments, or descriptions if needed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How accurate is the AI in categorizing my work?</AccordionTrigger>
        <AccordionContent>
          Our AI has been trained on thousands of timesheet entries and achieves over 95% accuracy in correctly
          categorizing work. The system also learns from your corrections over time, becoming more accurate with your
          specific work patterns.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Can I integrate this with my existing tools?</AccordionTrigger>
        <AccordionContent>
          Yes, we offer integrations with popular project management tools, accounting software, and CRMs. Our
          Professional and Enterprise plans include API access for custom integrations with your internal systems.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Is my data secure?</AccordionTrigger>
        <AccordionContent>
          Absolutely. We use industry-standard encryption for all data, both in transit and at rest. Our systems are
          regularly audited for security compliance, and we never share your data with third parties.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
