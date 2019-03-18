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
      name: 'Examples of platforms built with PubSweet',
      content: './content/examples_of_platforms_built_with_pubsweet.md',
    },
    {
      name: 'Before you start',
      content: './content/before_you_start.md',
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
      name: 'Getting started',
      content: './content/getting_started.md',
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
      ],
    },
    {
      name: 'Contributing',
      content: './content/contributing.md',
    },
    {
      name: 'Component library',
      sections: [
        {
          name: 'Atoms',
          components: '../packages/ui/src/atoms/*.js',
        },
        {
          name: 'Molecules',
          components: '../packages/ui/src/molecules/*.js',
        },
        {
          name: 'Core-components',
          components: '../packages/components/!(xpub-*|model-*)/**/*.{jsx,js}',
        },
        {
          name: 'Xpub-components',
          components: '../packages/components/xpub-*/**/*.{jsx,js}',
        },
      ],
    },
  ],
  ignore: [
    '**/components/Manage/**',
    '**/components/**/*.config.js',
    '**/components/*-server/**',
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
