export const getIsOwner = (userId: string, habitUserId: string) => {
  if (habitUserId === "" || userId === "") {
    return false;
  }
  return habitUserId === userId;
};
