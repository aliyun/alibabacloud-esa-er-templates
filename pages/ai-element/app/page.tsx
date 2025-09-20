"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Actions, Action } from "@/components/ai-elements/actions";
import { Fragment, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Response } from "@/components/ai-elements/response";
import { CopyIcon, GlobeIcon, RefreshCcwIcon } from "lucide-react";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { Loader } from "@/components/ai-elements/loader";

const models = [
  {
    name: "GPT 4o",
    value: "openai/gpt-4o",
  },
  {
    name: "Deepseek R1",
    value: "deepseek/deepseek-r1",
  },
];

// Mock response data generator
const generateMockResponse = (userMessage: string) => {
  const mockResponses = [
    {
      reasoning: "Let me analyze your question and provide a detailed answer.",
      text: "This is a great question! Based on my understanding, I can provide you with the following information and suggestions. Let me explain the related concepts and solutions in detail.",
      sources: [
        {
          url: "https://example.com/source1",
          title: "Related Documentation 1",
        },
        { url: "https://example.com/source2", title: "Technical Guide" },
      ],
    },
    {
      reasoning:
        "I need to carefully consider all aspects of this question to ensure I provide an accurate answer.",
      text: "Based on your question, I suggest thinking from the following perspectives: first, we need to understand the basic concepts; second, analyze specific application scenarios; finally, provide practical solutions.",
      sources: [{ url: "https://example.com/guide", title: "Complete Guide" }],
    },
    {
      reasoning:
        "This is a complex question, let me analyze it step by step and provide a comprehensive answer.",
      text: "Thank you for your question! This question involves considerations at multiple levels. Let me analyze it in detail for you: 1) Theoretical foundation; 2) Practical application; 3) Best practice recommendations. I hope this information is helpful to you!",
      sources: [
        { url: "https://example.com/best-practices", title: "Best Practices" },
        { url: "https://example.com/examples", title: "Example References" },
      ],
    },
  ];

  // Select different responses based on user message length
  const responseIndex = userMessage.length % mockResponses.length;
  return mockResponses[responseIndex];
};

const ChatBotDemo = () => {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const [mockMode, setMockMode] = useState(true);
  const { messages, sendMessage, status, setMessages } = useChat();

  // Mock conversation shown before any real messages are sent
  type ChatMessage = (typeof messages)[number];
  type MessagePart = ChatMessage["parts"][number];

  const mockMessages: ChatMessage[] = [
    {
      id: "m1",
      role: "user",
      parts: [
        {
          type: "text",
          text: "Give me a quick overview of this page's features.",
        },
      ],
    } as unknown as ChatMessage,
    {
      id: "m2",
      role: "assistant",
      parts: [
        {
          type: "reasoning",
          text: "I will read your selected model and search toggle, send your message to /api/chat, then stream back structured parts: reasoning, main answer, and sources.",
        },
        {
          type: "text",
          text: "This demo includes: 1) model selection (GPT‑4o, Deepseek R1); 2) optional web search; 3) attachment‑friendly input; 4) streaming responses; 5) expandable reasoning; 6) source list with copy/retry actions.",
        },
        {
          type: "source-url",
          url: "https://example.com/ai-element-demo",
        },
      ],
    } as unknown as ChatMessage,
  ];

  const displayedMessages: ChatMessage[] =
    messages.length > 0 ? (messages as ChatMessage[]) : mockMessages;

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    // If mock mode is enabled, only add mock response and return
    if (mockMode && message.text) {
      const mockResponse = generateMockResponse(message.text);

      // Create user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        parts: [
          {
            type: "text",
            text: message.text,
          },
        ],
      } as unknown as ChatMessage;

      // Create mock assistant message
      const mockMessage: ChatMessage = {
        id: `mock-${Date.now()}`,
        role: "assistant",
        parts: [
          {
            type: "reasoning",
            text: mockResponse.reasoning,
          },
          {
            type: "text",
            text: mockResponse.text,
          },
          ...mockResponse.sources.map((source) => ({
            type: "source-url",
            url: source.url,
            title: source.title,
          })),
        ],
      } as unknown as ChatMessage;

      // Add both user and assistant messages
      setMessages((prev) => [...prev, userMessage, mockMessage]);
      setInput("");
      return;
    }

    // Send real message only if not in mock mode
    sendMessage(
      {
        text: message.text || "Sent with attachments",
        files: message.files,
      },
      {
        body: {
          model: model,
          webSearch: webSearch,
        },
      }
    );
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
      <div className="flex flex-col h-full">
        <Conversation className="h-full">
          <ConversationContent>
            {displayedMessages.map((message: ChatMessage) => (
              <div key={message.id}>
                {message.role === "assistant" &&
                  message.parts.filter(
                    (part: MessagePart) =>
                      (part as { type: string }).type === "source-url"
                  ).length > 0 && (
                    <Sources>
                      <SourcesTrigger
                        count={
                          message.parts.filter(
                            (part: MessagePart) =>
                              (part as { type: string }).type === "source-url"
                          ).length
                        }
                      />
                      {message.parts
                        .filter(
                          (part: MessagePart) =>
                            (part as { type: string }).type === "source-url"
                        )
                        .map((part, i) => (
                          <SourcesContent key={`${message.id}-${i}`}>
                            <Source
                              key={`${message.id}-${i}`}
                              href={(part as { url?: string }).url || "#"}
                              title={(part as { url?: string }).url || "#"}
                            />
                          </SourcesContent>
                        ))}
                    </Sources>
                  )}
                {message.parts.map((part: MessagePart, i: number) => {
                  switch (part.type) {
                    case "text":
                      function regenerate(): void {
                        throw new Error("Function not implemented.");
                      }

                      return (
                        <Fragment key={`${message.id}-${i}`}>
                          <Message from={message.role}>
                            <MessageContent>
                              <Response>{part.text}</Response>
                            </MessageContent>
                          </Message>
                          {message.role === "assistant" &&
                            i === message.parts.length - 1 && (
                              <Actions className="mt-2">
                                <Action
                                  onClick={() => regenerate()}
                                  label="Retry"
                                >
                                  <RefreshCcwIcon className="size-3" />
                                </Action>
                                <Action
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      (part as { text?: string }).text || ""
                                    )
                                  }
                                  label="Copy"
                                >
                                  <CopyIcon className="size-3" />
                                </Action>
                              </Actions>
                            )}
                        </Fragment>
                      );
                    case "reasoning":
                      return (
                        <Reasoning
                          key={`${message.id}-${i}`}
                          className="w-full"
                          isStreaming={
                            status === "streaming" &&
                            i === message.parts.length - 1 &&
                            message.id === displayedMessages.at(-1)?.id
                          }
                        >
                          <ReasoningTrigger />
                          <ReasoningContent>
                            {(part as { text?: string }).text || ""}
                          </ReasoningContent>
                        </Reasoning>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            ))}
            {status === "submitted" && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput
          onSubmit={handleSubmit}
          className="mt-4"
          globalDrop
          multiple
        >
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </PromptInputBody>
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
              <PromptInputButton
                variant={webSearch ? "default" : "ghost"}
                onClick={() => setWebSearch(!webSearch)}
              >
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton>
              <PromptInputButton
                variant={mockMode ? "default" : "ghost"}
                onClick={() => setMockMode(!mockMode)}
              >
                <span>Mock</span>
              </PromptInputButton>
              <PromptInputModelSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((model) => (
                    <PromptInputModelSelectItem
                      key={model.value}
                      value={model.value}
                    >
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input && !status} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatBotDemo;
