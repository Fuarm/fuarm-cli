import { Command } from 'commander';
import { generateProject } from './generator.js';
import { prompt } from "./prompt.js";

export const run = (() => {
    const program = new Command();

    let version = '1.0.0';

    const execute = () => {
        program.version(version);
        program.parse(process.argv);

        action();
    };

    const action = async () => {
        await generateProject(await prompt());
    };

    execute.version = (v: string) => {
        version = v;
        return execute();
    };
    return execute;
})();
