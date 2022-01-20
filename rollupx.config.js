module.exports = {
  banner:
    '/*!\n' +
    ` * v-title v${require('./package.json').version}\n` +
    ` * (c) 2019-${new Date().getFullYear()} yujinpan\n` +
    ' * Released under the MIT License.\n' +
    ' */\n',
  inputFiles: ['**/*'],
  outputDir: 'lib',
  typesOutputDir: 'lib',
  singleFile: false
};
