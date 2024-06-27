import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Message from "../components/Message/Message";
import { ChatMessage } from "../types";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Message",
  component: Message,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    message: {
      userId: "123",
      text: "this is a story",
      timestamp: new Date("Wed Jun 26 2024 16:40:41 GMT-07"),
      name: "Jason Hsu",
    },
  },
};
