export const cn = (...inputs) => {
  // A simple classname merge function (similar to clsx + tailwind-merge)
  return inputs.filter(Boolean).join(' ')
}
