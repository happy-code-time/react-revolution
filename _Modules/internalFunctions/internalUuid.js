let previouslyUsedUuidInsideReactRevolutionsPackage = undefined;

const internalUuid = () => {
  const timestamp = Math.floor(Date.now() / 1000);
  let current = `${timestamp}${Math.floor(Math.random() * 1000000)}${Math.floor(Math.random() * 1000000)}${Math.floor(Math.random() * 1000000)}`;

  if (previouslyUsedUuidInsideReactRevolutionsPackage !== current) {
    previouslyUsedUuidInsideReactRevolutionsPackage = current;
    return current;
  }

  internalUuid();
};

export default internalUuid;
