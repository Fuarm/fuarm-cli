import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import deepmerge from 'deepmerge';

// 获取当前模块的 URL 并转换为文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), '../templates');

export const generateProject = async (config: any) => {
    const projectPath = path.join(process.cwd(), config.projectName);
    if (fs.existsSync(projectPath)) {
        console.error('项目目录已存在。');
        return;
    }

    // 根据用户选择的配置来确定模板路径
    const templatePath = path.join(
        __dirname,
        config.language.toLowerCase(),
        config.framework.toLowerCase(),
        "template"
    );

    const bundlerPath = path.join(
        __dirname,
        config.language.toLowerCase(),
        config.framework.toLowerCase(),
        config.bundler.toLowerCase(),
    );

    const formatterConfig = config.formatter.toLowerCase();
    const microFramework = config.microFramework ? config.microFramework.toLowerCase() : null;

    // 检查模板路径是否存在
    if (!fs.existsSync(templatePath) || !fs.existsSync(bundlerPath)) {
        console.error('未找到相应的模板文件。');
        return;
    }
    fs.mkdirSync(projectPath);
    // 复制模板文件
    fs.cpSync(templatePath, projectPath, { recursive: true });
    copyDirWithSkip(bundlerPath, projectPath);

    // 处理 ESLint 配置
    if (formatterConfig === 'eslint/prettier') {
        const eslintPath = path.join(__dirname, config.language.toLowerCase(), config.framework.toLowerCase(), 'eslint');
        if (fs.existsSync(eslintPath)) {
            copyDirWithSkip(eslintPath, projectPath);

            fs.chmodSync(path.join(projectPath, "eslint.config.js"), 0o444); // 设置文件为只读
            fs.chmodSync(path.join(projectPath, "prettier.config.js"), 0o444); // 设置文件为只读
        }
    }

    // 处理 WuJie 微服务框架
    if (microFramework) {
        const microFrameworkPath = path.join(__dirname, config.language.toLowerCase(), config.framework.toLowerCase(), microFramework);
        if (fs.existsSync(microFrameworkPath)) {
            copyDirWithSkip(microFrameworkPath, projectPath);
        }
    }

    console.log(`创建 ${config.language} + ${config.framework} + ${config.bundler}${config.microFramework ? ' + ' + config.microFramework : ''} + ${config.formatter} 项目：${config.projectName} `);
};

// 依赖合并策略（取较高版本）
const mergeDependencies = (deps1: Record<string, string> = {}, deps2: Record<string, string> = {}) => {
    return { ...deps1, ...deps2 }; // 直接覆盖，或可改进为选择最高版本
};

const mergedPackage = (targetPath: string, mergedTargetPath: string) => {

    const targetPackage = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
    const mergedTargetPackage = JSON.parse(fs.readFileSync(mergedTargetPath, 'utf-8'));

    const mergedPackage =  deepmerge(targetPackage, mergedTargetPackage, {
        customMerge: (key) => {
            if (['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'].includes(key)) {
                return (deps1, deps2) => mergeDependencies(deps1, deps2);
            }
            if (key === 'scripts') {
                return (scripts1, scripts2) => ({ ...scripts1, ...scripts2 });
            }
            return undefined; // 其他字段使用默认合并策略
        }
    });

    // 写入合并后的 package.json
    fs.writeFileSync(targetPath, JSON.stringify(mergedPackage, null, 2), 'utf-8');
}

const copyWithSkip = (src: string, dest: string) => {
    if (fs.existsSync(dest) && dest.includes("package.json")) {
        mergedPackage(dest, src);
        return; // 文件已合并，跳过
    }
    fs.cpSync(src, dest, { recursive: true });
};

// 复制目录，遇到重名文件则跳过
const copyDirWithSkip = (srcDir: string, destDir: string) => {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    const files = fs.readdirSync(srcDir);
    for (const file of files) {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);

        if (fs.statSync(srcPath).isDirectory()) {
            // copyDirWithSkip(srcPath, destPath); // 递归处理子目录
            fs.cpSync(srcPath, destPath, { recursive: true });
        } else {
            copyWithSkip(srcPath, destPath); // 复制文件
        }
    }
};

