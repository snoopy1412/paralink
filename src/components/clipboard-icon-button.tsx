import { Copy, Check } from 'lucide-react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useCopyToClipboard } from 'react-use';

import { cn } from '@/lib/utils';

import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

interface ClipboardIconButtonProps {
  text?: string;
  size?: string | number;
  color?: string;
  className?: string;
}

const ClipboardIconButton = ({
  text = '',
  size,
  color,
  className
}: ClipboardIconButtonProps) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const enterTimeout = useRef<NodeJS.Timeout | undefined>();
  const leaveTimeout = useRef<NodeJS.Timeout | undefined>();

  const handleCopy = useCallback(() => {
    if (!text) return;
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }, [copyToClipboard, text]);

  useEffect(() => {
    if (state.error) {
      console.error('Copy failed:', state.error);
    }
  }, [state]);

  const handleMouseEnter = useCallback(() => {
    clearTimeout(leaveTimeout.current);
    enterTimeout.current = setTimeout(() => {
      setOpen(true);
    }, 300);
  }, []);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(enterTimeout.current);
    leaveTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(enterTimeout.current);
      clearTimeout(leaveTimeout.current);
    };
  }, []);

  if (!text) return null;

  return (
    <Tooltip open={open}>
      <TooltipTrigger asChild>
        <div
          onClick={handleCopy}
          className="size-4 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Check
            strokeWidth={1.25}
            size={size}
            color={color}
            className={cn(
              'text-muted-foreground hover:text-muted-foreground/80',
              className,
              copied ? 'block' : 'hidden'
            )}
          />
          <Copy
            strokeWidth={1.25}
            size={size}
            color={color}
            className={cn(
              'text-muted-foreground hover:text-muted-foreground/80',
              className,
              copied ? 'hidden' : 'block'
            )}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {copied ? 'Copied!' : 'Copy to clipboard'}
      </TooltipContent>
    </Tooltip>
  );
};

export default ClipboardIconButton;
