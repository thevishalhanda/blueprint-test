import clsx from "clsx";
import { useMemo } from "react";
import sanitizeHtml from 'sanitize-html';


// 1. Define the Component
export const WestSideRichText = ({ cms }:{cms: any}) => {
  const { content, className, backgroundColor } = cms;

  const sanitizedHtml = useMemo(() => {
    return typeof content === 'string'
      ? sanitizeHtml(content, { allowedAttributes: false })
      : '';
  }, [content]);

  return (
    <div>
    <div
      className={clsx(
        'mx-auto flex flex-col [&_a]:underline [&_h1]:text-center [&_p]:mb-4', // your tailwind classes
        className,
      )}
      style={{ backgroundColor: backgroundColor || 'transparent' }}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    <div >
        Welcome to the Westside Rich Text Section! Edit this content in Pack.
    </div>
      </div>
  );
};

// 2. Attach the Schema (This is what Pack reads)
WestSideRichText.Schema = {
  label: 'WestSide Rich Text',
  key: 'westside-rich-text',
  category: 'Text Blocks',
  fields: [
    {
      component: 'rich-text', // Uses the Pack Rich Text editor
      name: 'content',        // Matches cms.content above
      label: 'Text Content',
      defaultValue: '<h1>WestSide Design</h1><p>Edit this text in Pack.</p>',
    },
    {
      component: 'text',
      name: 'className',
      label: 'Custom CSS Classes',
      description: 'Add Tailwind classes here',
    },
    {
      component: 'color',
      name: 'backgroundColor',
      label: 'Background Color',
      defaultValue: '#ffffff',
    },
  ],
};