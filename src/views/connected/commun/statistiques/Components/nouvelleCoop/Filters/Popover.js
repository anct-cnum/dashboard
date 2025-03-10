import React, { useState } from 'react';
import { Popover as RadixPopover } from 'radix-ui';
import PropTypes from 'prop-types';

export const Popover = ({
  open,
  onOpenChange,
  onInteractOutside,
  onEscapeKeyDown,
  trigger,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(open ?? false);
  const isControlled = open !== undefined;

  const handleOpenChange = nextOpen => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const currentOpen = isControlled ? open : internalOpen;

  return (
    <RadixPopover.Root open={currentOpen} onOpenChange={handleOpenChange}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          onEscapeKeyDown={onEscapeKeyDown}
          onInteractOutside={onInteractOutside}
          align="start"
          className="fr-background-default--grey fr-tile--shadow fr-rounded-md fr-mt-4v fr-p-8v fr-border-radius--8"
        >
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};


Popover.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onInteractOutside: PropTypes.func,
  onEscapeKeyDown: PropTypes.func,
  trigger: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  // children: PropTypes.checkPropTypes([
  //   PropTypes.undefined
  // ]),

};

export default Popover;
