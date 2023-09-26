module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    "moduleNameMapper": {
        "\\.(css|less)$": "identity-obj-proxy"
    }
};
