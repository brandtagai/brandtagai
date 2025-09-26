export const Switch = ({ className = "", ...props }) => (
  <input type="checkbox" className={`${className}`} {...props} />
);
