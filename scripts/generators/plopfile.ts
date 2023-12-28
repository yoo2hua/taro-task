import autocompletePrompt from 'inquirer-autocomplete-prompt'
import { NodePlopAPI, PlopGeneratorConfig } from 'plop'

export default function (plop: NodePlopAPI) {
  plop.setPrompt('autocomplete', autocompletePrompt)

  plop.setGenerator('atom/molecule/organism', {
    description: 'add an organism to a project',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What type of component would you like?',
        choices: ['atom', 'molecule', 'organism'],
      },
      {
        type: 'input',
        name: 'name',
        message: "What is the component's name?",
      },
      {
        type: 'confirm',
        name: 'shouldCreateStory',
        message: 'Should a stories file be created?',
      },
    ],
    actions(data) {
      const actions: PlopGeneratorConfig['actions'] = []
      if (!data) return actions

      const path = `../src/components/${data.type}s/`
      actions.push({
        type: 'add',
        path: `${path}/{{pascalCase name}}.tsx`,
        templateFile: `./plop-templates/component.hbs`,
      })

      if (data.shouldCreateStory) {
        actions.push({
          type: 'add',
          path: `${path}/{{pascalCase name}}.stories.tsx`,
          templateFile: './plop-templates/component-story.hbs',
        })
      }
      return actions
    },
  })
}
