function removeSensitiveData(user) {
  // eslint-disable-next-line camelcase
  const { user_password, ...userWithoutSensitiveData } = user;
  return userWithoutSensitiveData;
}

module.exports = removeSensitiveData;
