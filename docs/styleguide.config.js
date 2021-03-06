module.exports = {
  context: {
    faker: 'faker',
  },
  sections: [
    {
      name: 'Introduction',
      content: './content/introduction.md',
    },
    {
      name: 'Before you start',
      content: './content/before_you_start.md',
    },
    {
      name: 'Getting started',
      content: './content/getting_started.md',
    },
    {
      name: 'Contributing',
      content: './content/contributing.md',
    },
    {
      name: 'Examples of platforms built with PubSweet',
      content: './content/examples_of_platforms_built_with_pubsweet.md',
    },
    {
      name: 'Designing workflow',
      content: './content/designing_workflow.md',
    },
    {
      name: 'Workflow case studies',
      content: './content/workflow_case_studies.md',
    },
    {
      name: 'Technical architecture',
      content: './content/technical_architecture.md',
    },
    {
      name: 'More PubSweet Core',
      sections: [
        {
          name: 'Base model (data models)',
          content: '../packages/base-model/README.md',
        },
        {
          name: 'Database manager',
          content: '../packages/db-manager/README.md',
        },
        {
          name: 'Logger',
          content: '../packages/logger/README.md',
        },
        {
          name: 'Job runner',
          content: './content/job_runner.md',
        },
        {
          name: 'Command-line interface',
          content: '../packages/cli/README.md',
        },
      ],
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'What are components?',
          content: './content/what_are_components.md',
        },
        {
          name: 'How do you create a component?',
          content: './content/how_do_you_create_a_component.md',
        },
        {
          name: 'How do you use components?',
          content: './content/how_do_you_use_components.md',
        },
      ],
    },
    {
      name: 'Authorization and permissions',
      sections: [
        {
          name: 'Why authsome?',
          content: './content/why_authsome.md',
        },
        {
          name: 'How to use authsome?',
          content: './content/how_to_use_authsome.md',
        },
      ],
    },
    {
      name: 'Theming',
      sections: [
        {
          name: 'Using themes',
          content: './content/using_themes.md',
        },
        {
          name: 'Advanced theming',
          content: './content/advanced_theming.md',
        },
        {
          name: 'Theme variables',
          sections: [
            {
              content: '../packages/ui/docs/brand_colors.md',
              name: 'Brand colors',
            },
            {
              content: '../packages/ui/docs/state_colors.md',
              name: 'State colors',
            },
            {
              content: '../packages/ui/docs/fonts.md',
              name: 'Fonts',
            },
          ],
        },
      ],
    },
    {
      name: 'Development help',
      sections: [
        {
          name: 'Where can I ask questions?',
          content: './content/where_can_i_ask_questions.md',
        },
        {
          name: 'How can I debug?',
          content: './content/how_can_i_debug.md',
        },
        {
          name: 'Setup',
          content: './content/setup.md',
        },
        {
          name: 'FAQ',
          content: './content/faq.md',
        },
      ],
    },
    {
      name: 'UI',
      sections: [
        {
          name: 'Atoms',
          components: '../packages/ui/src/atoms/*.js',
        },
        {
          name: 'Molecules',
          components: '../packages/ui/src/molecules/*.js',
        },
      ],
    },
    {
      name: 'Component library',
      sections: [
        {
          name: 'Client',
          components: '../components/client/component-!(xpub-*)/**/*.{js,jsx}',
        },
        {
          name: 'Server',
          sections: [
            {
              name: 'User model',
              content: '../components/server/model-user/README.md',
            },
            // {
            //   name: 'Team model',
            //   content: '../components/server/model-team/README.md',
            // },
            // {
            //   name: 'component-aws-s3',
            //   content: '../components/server/component-aws-s3/README.md',
            // },
            // {
            //   name: 'component-email-templating',
            //   content:
            //     '../components/server/component-email-templating/README.md',
            // },
            // {
            //   name: 'component-password-reset-server',
            //   content:
            //     '../components/server/component-password-reset-server/README.md',
            // },
            // {
            //   name: 'component-send-email',
            //   content: '../components/server/component-send-email/README.md',
            // },
            // {
            //   name: 'job-xsweet',
            //   content: '../components/server/job-xsweet/README.md',
            // },
          ],
        },
      ],
    },
  ],
  ignore: [
    '**/components/**/*.config.js',
    '**/node_modules/**',
    '**/*.test.{js,jsx}',
  ],
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    StyleGuideRenderer: require.resolve('./src/components/StyleGuideRenderer'),
    ComponentsListRenderer: require.resolve(
      './src/components/ComponentsListRenderer',
    ),
    SectionRenderer: require.resolve('./src/components/SectionRenderer'),
    Wrapper: require.resolve('./src/components/Wrapper'),
    LogoRenderer: require.resolve('./src/components/LogoRenderer'),
  },
  title: 'PubSweet',
  theme: {
    color: {
      link: '#ED2C75',
      linkHover: '#61C4B9',
      sidebarBackground: '#4FC4B9',
      sidebarLink: 'white',
    },
    sidebarWidth: 300,
  },
  styles: {
    Logo: {
      // We're changing the LogoRenderer component
      logo: {
        // We're changing the rsg--logo-XX class name inside the component
        color: 'white',
      },
    },
  },
  pagePerSection: true,
  dangerouslyUpdateWebpackConfig: (webpackConfig, env) => {
    // Due to: https://github.com/webpack/webpack/issues/8688
    if (webpackConfig.optimization) {
      webpackConfig.optimization.concatenateModules = false
    }
    return webpackConfig
  },
  assetsDir: './assets',
}
