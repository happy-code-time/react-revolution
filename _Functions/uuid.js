let previouslyUsedUuidInsideReactRevolutionsPackage = undefined;

const uuid = () => {
  let current = `${Math.floor(Math.random() * 1000000)}${Math.floor(Math.random() * 1000000)}${Math.floor(Math.random() * 1000000)}`;

  if (previouslyUsedUuidInsideReactRevolutionsPackage !== current) {
    previouslyUsedUuidInsideReactRevolutionsPackage = current;
    return current;
  }
  
  return uuid();
};

export default uuid;
