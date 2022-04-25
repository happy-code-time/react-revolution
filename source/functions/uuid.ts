let previouslyUsedUuidInsideReactRevolutionsPackage = undefined;

const uuid = () => {
  let current = `${Math.floor(Date.now() / 1000)}${Math.floor(Math.random() * 1000)}`;

  if (previouslyUsedUuidInsideReactRevolutionsPackage !== current) {
    previouslyUsedUuidInsideReactRevolutionsPackage = current;
    return current;
  }
  
  return uuid();
};

export default uuid;
