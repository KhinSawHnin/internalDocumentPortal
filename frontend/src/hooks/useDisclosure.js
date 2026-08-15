import { useState, useCallback } from 'react';

/**
 * Small helper for dialog open/close + "which row is this dialog for"
 * state — used by both UsersPage and DocumentsPage for the
 * create/edit dialog pattern so it isn't duplicated per feature.
 */
export function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState(null); // e.g. the row being edited, or null for "create"

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
