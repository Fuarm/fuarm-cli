import inquirer from 'inquirer';

export const prompt = async () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: '输入项目名称:',
            default: 'my-project'
        },
        {
            type: 'list',
            name: 'language',
            message: '选择开发语言:',
            choices: ['JavaScript']
        },
        {
            type: 'list',
            name: 'framework',
            message: '选择开发框架:',
            choices: ['Vue']
        },
        {
            type: 'confirm',
            name: 'microservices',
            message: '使用微服务架构?',
            default: false
        },
        {
            type: 'list',
            name: 'microFramework',
            message: '选择微服务框架:',
            choices: ['WuJie', "WuJie-Sub"],
            when: (answers) => answers.microservices
        },
        {
            type: 'list',
            name: 'bundler',
            message: '选择打包器:',
            choices: ['Vite']
        },
        {
            type: 'list',
            name: 'formatter',
            message: '选择代码格式标准:',
            choices: ['ESLint/Prettier']
        }
    ]);
};