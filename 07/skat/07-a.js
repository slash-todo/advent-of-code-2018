console.clear();
const instructions = require('./input.js');
// const instructions = [
//     'Step C must be finished before step A can begin.',
//     'Step C must be finished before step F can begin.',
//     'Step A must be finished before step B can begin.',
//     'Step A must be finished before step D can begin.',
//     'Step B must be finished before step E can begin.',
//     'Step D must be finished before step E can begin.',
//     'Step F must be finished before step E can begin.'
// ];

const tokenizeSteps = step => {
    const tokens = step.split(' ');
    return {
        step: tokens[7],
        dependency: tokens[1]
    };
};

// Start Processing
const tokenizedInstructions = instructions.map(step => tokenizeSteps(step));

const findAllSteps = ruleset => {
    let steps = [];
    ruleset.forEach(step => {
        // get both the step and dependency
        Object.values(step).forEach(value => {
            if (!steps.includes(value)) {
                steps.push(value);
            }
        });
    });
    return steps;
};

const getEachStepsDependencies = ruleset => {
    let steps = findAllSteps(ruleset);
    steps = steps.map(step => {
        let dependencies = [];
        ruleset.forEach(rule => {
            if (step === rule.step && !dependencies.includes(rule.dependency)) {
                dependencies.push(rule.dependency);
            }
        });
        return { step, dependencies };
    });
    // sort alphabetically
    steps.sort((a, b) => (a.step < b.step ? -1 : 1));
    return steps;
};

const doSteps = ruleset => {
    let sequence = '';
    let steps = getEachStepsDependencies(ruleset);
    while (steps.length > 0) {
        const task = steps.find(step => step.dependencies.length === 0);
        const index = steps.findIndex(step => step.dependencies.length === 0);
        // remove step
        steps.splice(index, 1);

        // log it to the sequence
        sequence += task.step;

        // remove dependency from all steps
        const removeDependency = (letter, steps) => {
            // debugger;
            return steps.map(step => {
                let target = step.dependencies.findIndex(el => el === letter);
                if (target >= 0) {
                    step.dependencies.splice(target, 1);
                }
                return step;
            });
        };
        steps = removeDependency(task.step, steps);
        // debugger;
    }
    return sequence;
};

console.log(doSteps(tokenizedInstructions));
