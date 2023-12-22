const withOpacity = function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue: string }) => {
    if (opacityValue) return `rgba(var(${variableName}), ${opacityValue})`;
    return `rgb(var(${variableName}))`;
  };
};
export default withOpacity;
