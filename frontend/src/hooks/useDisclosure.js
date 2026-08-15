import { useState, useCallback } from 'react';


export function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState(null);

  const open = useCallback((ctx = null) => {
    setContext(ctx);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setContext(null);
  }, []);

  return { isOpen, context, open, close };
}
