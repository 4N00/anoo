type AnyProps = Record<string, any>;

const MOTION_PROPS = [
  'whileHover',
  'whileInView',
  'initial',
  'animate',
  'variants',
  'transition',
  'viewport',
  'whileTap',
  'exit'
];

const STYLED_PROPS = [
  '$isOpen',
  '$variant',
  '$featured',
  '$isMenuOpen',
  '$isActive',
  '$status',
  '$isDragging',
  '$isDraggingOver',
  '$color',
  'as'
];

export const stripMotionProps = (props: AnyProps) => {
  const rest = { ...props };
  MOTION_PROPS.forEach((prop) => delete rest[prop]);
  return rest;
};

export const stripStyledProps = (props: AnyProps) => {
  const rest = { ...props };
  STYLED_PROPS.forEach((prop) => delete rest[prop]);
  return rest;
};

export const stripAllProps = (props: AnyProps) => {
  return stripStyledProps(stripMotionProps(props));
};
