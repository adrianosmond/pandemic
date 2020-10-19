import React from 'react';
import classnames from 'classnames';

const Typography = ({
  as: Element = 'p',
  appearance,
  children,
  className,
  ...props
}) => (
  <Element
    className={classnames(
      {
        'text-2xl font-bold': appearance === 'h1',
        'text-xl font-bold': appearance === 'h2',
        'text-lg font-bold': appearance === 'h3',
        'text-base font-bold': appearance === 'h4',
      },
      className,
    )}
    {...props}
  >
    {children}
  </Element>
);

export default Typography;
