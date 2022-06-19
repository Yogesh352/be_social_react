import React from 'react';

import LoginForm from '../src/components/Login/LoginForm';

export default {
  title: 'Example/Loginform',
  component: LoginForm,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <LoginForm {...args} />;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const EmptyForm = Template.bind({});

